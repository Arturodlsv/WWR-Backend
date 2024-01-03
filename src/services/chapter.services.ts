import { PrismaClient } from '@prisma/client'
import { TChapters } from '../types/chapter.types'
const prisma = new PrismaClient()

class ChapterServices {
  async createChapter(data: TChapters) {
    let result
    try {
      result = await prisma.$transaction(async (tx) => {
        // Create the book inside of the transaction
        const chapter = await tx.chapters.create({
          data: {
            title: data.title,
            content: data.content
          }
        })
        //create a chapter associated with the book inside the same transaction
        const insertChapterBook = await tx.bookChapters.create({
          data: {
            bookId: data.bookId,
            chapterId: chapter.id
          }
        })
        return { chapter, insertChapterBook }
      })
    } catch (e: Error | any) {
      throw new Error(e.message)
    }
  }

  async updateChapter(data: TChapters) {
    try {
      const chapter = await prisma.bookUser.update({
        where: {
          bookId: data.bookId,
          userId: data.userId
        },
        data: {
          Book: {
            update: {
              BookChapters: {
                update: {
                  where: {
                    bookId: data.bookId,
                    chapterId: data.chapterId
                  },
                  data: {
                    Chapter: {
                      update: {
                        title: data.title,
                        content: data.content
                      }
                    }
                  }
                }
              }
            }
          }
        }
      })
      return chapter
    } catch (e: Error | any) {
      throw new Error(e.message)
    }
  }
  async getChaptersByBookId(userId: string, bookId: string) {
    try {
      const chapters = await prisma.bookUser.findMany({
        where: {
          bookId: bookId,
          userId: userId
        },
        include: {
          Book: {
            include: {
              BookChapters: {
                include: {
                  Chapter: true
                }
              }
            }
          }
        }
      })
      return chapters
    } catch (e: Error | any) {
      throw new Error(e.message)
    }
  }

  async getChapterById(userId: string, bookId: string, chapterId: string) {
    try {
      const chapter = await prisma.bookUser.findUnique({
        where: {
          bookId: bookId,
          userId: userId,
          AND: {
            Book: {
              BookChapters: {
                some: {
                  chapterId: chapterId
                }
              }
            }
          }
        },
        include: {
          Book: {
            include: {
              BookChapters: {
                include: {
                  Chapter: true
                }
              }
            }
          }
        }
      })
      if (!chapter) {
        throw new Error('Chapter not found')
      }
    } catch (e: Error | any) {
      throw new Error(e.message)
    }
  }
}

export default ChapterServices
