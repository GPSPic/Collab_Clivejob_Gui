const StoriesList = ({stories}) => {

    const storiesElement = stories.map((story) => {
        return <li key={story.id}><a href={story.url}>{story.title}</a></li>
    })

    return ( 
        <>
            <ul>
                {storiesElement}
            </ul>
        </>
     );
}
 
export default StoriesList;