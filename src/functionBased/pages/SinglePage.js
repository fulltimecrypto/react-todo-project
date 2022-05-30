import React from "react"
import { useParams } from "react-router-dom"

const SinglePage = () => {

    const aboutData = [
        {
            slug: "about-app",
            title: "About the App",
            description:
            "In this app, you can add, delete, submit and edit items. To edit items, simply double click on it. Once you are done, press the enter key to resubmit. This app will persist your data in the browser local storage. So whether you reload, close your app or reopened it, you still have access to your to-dos items.",
        },
        {
            slug: "about-author",
            title: "About the Author",
            description:
            "This app was developed by Alain Glücksmann, a self-taught developer."
        },
    ]

    
    //The useParams hook is used to read the dynamic params from the current URL that were matched by <Route path>. For example, if a route looks like this:
    // /some-path/:name/:id -> 
    // {
    //     name: <some value>,
    //     id: <some value>
    // }

    //the current path of this page is /about/:slug
    // so 
    // {
    //     slug: "about-app" or "about-author",
    // }
    const { slug } = useParams()
    //now: slug = "about-app" or "about-author"
    const aboutContent = aboutData.find(item => item.slug === slug)
    const { title, description } = aboutContent 
    
    return (
        <div className="main__content">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      )
}
export default SinglePage