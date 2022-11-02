import { Container } from "@mui/system"
import { FeedItem } from "./FeedItem"

export const NewsFeed = ({data}) => {


    return (
     <Container style={{
        display: 'flex',
        gap: "2rem",
        flexDirection: 'column'
     }}>
        {   
        data.map((item) => {
            return <FeedItem {...item} />
        })
}
     </Container>
    )
}