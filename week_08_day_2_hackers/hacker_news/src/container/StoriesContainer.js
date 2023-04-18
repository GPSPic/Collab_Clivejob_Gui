import { useEffect, useState } from "react";
import StoriesList from "../components/StoriesList";
import SearchField from "../components/SearchField";

const StoriesContainer = () => {
    const [stories, setStories] = useState(null)
    // const [searchTerms, setSearchTerms] = useState(null)
    const [sortedStories, setSortedStories] = useState(null)

    useEffect(() => {
        loadStories()
    }, [])

    const loadStories = function () {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then(res => res.json())
        .then(data => {
            const storiesPromises = data.map((storyId) => {
                // return fetch('https://hacker-news.firebaseio.com/v0/item/' + storyId + '.json')
                return fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
                .then(res => res.json())
            })
            Promise.all(storiesPromises)
            .then(storiesData => {
                setStories(storiesData)
                setSortedStories(storiesData)
            })
        })
    }

    const onChangeUpdateSearchTerms = (searchedTerm) => {
        if (!searchedTerm) {
            setSortedStories(stories)
        } else {
            const sortedStoriesData = stories.filter(story => {
                const lowerCaseTitle = story.title.toLowerCase()
                const lowerSearchedTerm = searchedTerm.toLowerCase()
                return lowerCaseTitle.includes(lowerSearchedTerm)
            })
            setSortedStories(sortedStoriesData)   
        }
    }


    return ( 
        <>
            <h2>Stories Container exists</h2>
            <SearchField onChangeUpdateSearchTerms={onChangeUpdateSearchTerms} />
            {sortedStories ? <StoriesList stories={sortedStories}/> : <p>Fetching article data, please wait...</p>}
        </>
     );
}
 
export default StoriesContainer;


// {
