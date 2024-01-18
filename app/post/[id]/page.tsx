'use client'

import {
    Post as PostType,
    Comment,
    usePublication,
    PublicationId,
    useSession,
    usePublications,
    useCreateComment,
  } from "@lens-protocol/react-web";

  import {
    Text,
    Button,
    Space,
    Center,
    Container,
    Group,
    Loader,
    Paper,
    Textarea,
    Avatar,
  } from "@mantine/core";
import Post from "@/components/Post";
import InfiniteScroll from "react-infinite-scroll-component";

export default function PostPage ({
        params
    } : {
        params: {
        id: string
        }
    }) {
   

    const publication = usePublication({
        forId: params.id as PublicationId,
      });
    
      const comments = usePublications({
        where: {
          commentOn: {
            id: params.id as PublicationId,
          },
        },
      });
    console.log(comments)
  
      

    return (
        <>

        {publication && (
            <Container size='md'>
            <Post post={publication.data} />
            </Container>
        )}
        
       
<Space h="md"/>
        
<InfiniteScroll
        dataLength={comments?.data?.length || 0}
        next={() => comments.next()}
        hasMore={comments.hasMore}
        loader={
          <>
            <Group justify="center">
              <Loader color="purple" />
            </Group>
          </>
        }
        endMessage={<Space h={100} />}
      >
        {!!comments?.data &&
          comments?.data?.length > 0 &&
          comments?.data?.map((post, index) => <Post key={index} post={post} />)}
      </InfiniteScroll>
        
        
        </>
    )
}