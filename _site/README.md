# This website

- I have made this website using using [Jekyll](https://jekyllrb.com/)
- All information on installing Jekyll, running the website locally and building for deployment can be found in [Jekyll's Documentation](https://jekyllrb.com/docs/installation/)
---
## Scripts
- I have edited the [script](https://github.com/JohnCosta27/PureScript) that [JohnCosta27](https://github.com/JohnCosta27) has made. Please find my changes [here](https://github.com/Hamza-Rafi/PureScript)
- There are instructions on how to run the PureScript in the README in [my github repository](https://github.com/Hamza-Rafi/PureScript)

### To update publications on the website
- Run `index.js` as shown by the `README` in [PureScript](https://github.com/Hamza-Rafi/PureScript)
- Replace `_data/publications.json` with the output file of the script.
---
## Making changes/updating the website

- All the site's pages can be found in the `pages` directory.
- Content can be edited directly from the `.md` and `.html` files.
- In the `_data` repository there are some addition files. Please do not edit `_data/accordion.json` and `_data/navbar.json` as the design of the website depends on these.
- To update the books, add a new entry in `books.json` with the format:
```json
    {
        "title": "Book Title",
        "authors": "Author 1, Author 2",
        "text": "Additional text for the book",
        "image": "path to image in /assets/images/books",
        "link": "link to book" // this is optional (the rest are obligatory)
    },
```


