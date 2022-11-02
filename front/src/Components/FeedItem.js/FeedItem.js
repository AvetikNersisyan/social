import { Container, Box } from "@mui/system"

export const FeedItem = ({content, title, name, surname}) => {
    
    return (
        <Container>
            <Box style={{
                color: 'red',
                border: '1px solid gray'
            }}>
                <h4> {title}</h4>
                <pre> {content}</pre>
            </Box>
        </Container>
    )
}