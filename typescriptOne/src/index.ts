
////// EXERCISE ONE ///////

console.log("///////// EXERCISE 1 //////////")

try {
    interface Person {
        name: string,
        age: number,
        gender: Gender[]
    }

    enum Gender {
        MALE = 'male',
        FEMALE = 'female'
    }

    function filterByProp<T, K>(arr: K[], property: string, value: T): K[] {
        const foundCases = arr.filter(e => {
            const prop = e[property]
            if (Array.isArray(prop)) {
                if (prop.some(f => f === value)) {
                    return e
                }
            }
            if (prop === value) return e
        })
        if (!foundCases.length) throw new Error('Nothing found')
        return foundCases
    }

    const people: Person[] = [
        { name: 'Alice', age: 25, gender: [Gender.FEMALE] },
        { name: 'Bob', age: 30, gender: [Gender.MALE] },
        { name: 'Charlie', age: 35, gender: [Gender.MALE, Gender.FEMALE] }
    ]

    console.log(filterByProp(people, 'age', 35))
    console.log(filterByProp(people, 'name', 'Bob'))
    console.log(filterByProp(people, 'gender', 'female'))
    console.log(filterByProp(people, 'age', 32))
} catch (e) {
    if (e.message === 'Nothing found') {
        console.log(e.message)
    } else {
        console.log(e)
    }
}

console.log("///////// EXERCISE 2 //////////")


/////// EXERCISE 2 ///////

try {
    interface Book {
        title: string,
        author: Author[]
    }

    interface Author {
        firstName: string,
        lastName: string
    }

    interface ILibrary {
        // books: Book[],
        addBook(book: Book): void,
        removeBook(title: string): void,
        listBooks<T>(property: string, value: T): Book[]
    }

    class Library implements ILibrary {
        private books: Book[] = []

        addBook(book: Book): void {
            this.books.push(book)
            console.log('the book ', book, ' has been added successfully')
        }

        removeBook(ttl: string): void {
            if (!this.books.length) throw new Error('Nothing to remove')

            for (let i = 0; i < this.books.length; i++) {
                if (this.books[i].title === ttl) {
                    this.books.splice(i, 1)
                    console.log('Book removed successfully')
                    break
                }
            }

            // let booksArray = this.books.filter(e => {
            //     if (e.title !== ttl) {
            //         return true
            //     } else {
            //         return false
            //     }
            // })

            // if (booksArray.length === this.books.length) throw new Error('Nothing removed')
            // this.books = booksArray
        }

        listBooks<T>(property: string, value: T): Book[] {
            const foundCases = this.books.filter(e => {
                if (property === 'author') {
                    if (e.author.some(e => e.firstName === value || e.lastName === value)) {
                        return e
                    }
                }
                if (e[property] === value) return e
            })
            if (!foundCases.length) throw new Error('Nothing Found')
            return foundCases
        }
    }

    const talismanAuthors: Author[] = [
        {
            firstName: "Stephen ",
            lastName: "King"
        },
        {
            firstName: "Peter ",
            lastName: "Straub"
        }
    ]

    const kareninaAuthor: Author[] = [
        {
            firstName: "Leo",
            lastName: "Tolstoy"
        }
    ]

    const book1: Book = { title: "The Talisman", author: talismanAuthors }
    const book2: Book = { title: "Anna Karenina", author: kareninaAuthor }

    const library: Library = new Library()

    library.addBook(book1)
    library.addBook(book2)

    console.log('//////////// Books by author ///////////')
    console.log(library.listBooks('author', 'Leo'))
    console.log(library.listBooks('author', 'Straub'))

    console.log('/////////// Books by title //////////')

    console.log(library.listBooks('title', "The Talisman"))
    console.log(library.listBooks('title', 'Anna Karenina'))

    library.removeBook("Anna Karenina")
    library.removeBook("The Talisman")

    // console.log(library.listBooks('title', "The Talisman"))
    // console.log(library.listBooks('title', 'Anna Karenina'))

} catch (e) {
    if (e.message === 'Nothing found' || e.message === 'Nothing to remove') {
        console.log(e.message)
    } else {
        console.log(e)
    }
} // Dali e dobro da go stavam vaka cel kod vo try catch?
























