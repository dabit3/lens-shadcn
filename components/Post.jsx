'use client'
import React, { useMemo, useEffect, useRef } from "react";
import DateFormat from "@/components/DateFormat";

import { useRouter } from "next/router";
import {
  Paper,
  Group,
  Avatar,
  Space,
  ScrollArea,
  Text,
  Spoiler,
  Image,
  HoverCard,
  UnstyledButton
} from "@mantine/core";
import Link from 'next/link'

export default function Post({ post }) {
  if (!post) return null;
 

  const replaceURLs = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const atSymbolRegex = /(\S*@+\S*)/g;

    return text
      .replace(
        urlRegex,
        (url) => `<a href="${url}" target="_blank">${url}</a>`,
      )
      .replace(atSymbolRegex, (match) => ` ${match} `);
  };

  return (
    <>
    <UnstyledButton w="100%" h="100%" component={Link} href={`/post/${post.id}`}>
  <Paper h="100%" p="lg" shadow="xl" radius="md" withBorder>
        <HoverCard
          width={320}
          shadow="md"
          withArrow
          openDelay={200}
          closeDelay={400}
          zIndex={99999999}
          
        >
          
    
      {/* HoverCard should only trigger when hovering over the Avatar and Text */}
      <Group>
        <HoverCard.Target>
        <UnstyledButton component={Link} href={`/h/${post.by?.handle?.localName}`}>
    <Group >
  
        <Avatar
          // @ts-ignore
          src={
            post?.by?.metadata?.picture &&
            "optimized" in post?.by?.metadata?.picture
              ? post.by.metadata.picture.optimized?.uri
              : "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
          }
          alt={`${post.by?.handle?.localName}'s profile picture`}
          size="lg"
          radius="md"
        />
        <Text fw={500} size="sm">
          {post.by?.metadata?.displayName ||
            post.by?.handle?.localName}
        </Text>
       
        </Group>
        </UnstyledButton>
</HoverCard.Target>
      </Group>

           
      <HoverCard.Dropdown>
     
              <Group>
                <Avatar
                  // @ts-ignore
                  src={
                    post?.by?.metadata?.picture &&
                    "optimized" in post?.by?.metadata?.picture
                      ? post.by.metadata.picture.optimized?.uri
                      : "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
                  }
                  alt={`${post.by?.handle?.localName}'s profile picture`}
                  size="lg"
                  radius="md"
                />

                <div style={{ flex: 1 }}>
                  <Text size="md" fw={500}>
                    {post.by?.metadata?.displayName ||
                      post.by?.handle?.localName}
                  </Text>

                  <Text c="dimmed" size="sm">
                    @{post.by?.handle?.localName}
                  </Text>
                </div>
              </Group>
              
              <Space h="md" />
              <Text lineClamp={3} fw={200}>
                {
                  // @ts-ignore
                  post.by.metadata?.bio || null
                }
              </Text>
              <Space h="md" />
              <Group justify="center">
                <Text fw={500} size="sm">
                  {
                    // @ts-ignore
                    post.by.stats.followers || "0"
                  }{" "}
                  Followers
                </Text>
                |
                <Text fw={500} size="sm">
                  {
                    // @ts-ignore
                    post.by.stats.following || "0"
                  }{" "}
                  Following
                </Text>
              </Group>
            </HoverCard.Dropdown>
          
        </HoverCard>

        
        <Space h="xs"/>

        <ScrollArea h={250} offsetScrollbars scrollbarSize={20} scrollHideDelay={2000}>
            <Text
                size="md"
                style={{
              maxWidth: "100%",  // Ensure message text does not overflow
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",  // Allow text to wrap
              wordWrap: "break-word",
             
                }}
                
                dangerouslySetInnerHTML={{
                  __html:
                    // @ts-ignore
                    post?.metadata?.content
                      ? replaceURLs(
                          // @ts-ignore
                          post.metadata.content.replace(/\n/g, "<br> "),
                        )
                      : "",
                }}
              />
              </ScrollArea>

              {
          // @ts-ignore
          post.metadata?.asset?.image && (
            
              <Image
                // @ts-ignore
                src={post?.metadata?.asset?.image?.optimized?.uri}
                radius="xs"
                
                style={{
                  width: "100%", // Width is 100% of the container
                  maxWidth: "100%", // Ensures the image doesn't scale beyond its original size
                  maxHeight: "888px",
                }}
                alt={`${post.by?.handle?.localName}'s Post Image`}
              />
         
          )
        }



  
              <Space h="sm"/>

              {post.mirrorOn?.id && (
                <UnstyledButton w="100%" h="100%" component={Link} href={`/post/${post.id}`}>
                <Paper h="100%" p="lg" shadow="xl" radius="md" withBorder>
                  
                            <Group justify="right">
                            <Text c="dimmed" size="xs" fw={500} mb={22}>
                            {DateFormat(post.mirrorOn?.createdAt)} ago
                          </Text>
                        </Group>
              
                      
                      <HoverCard
                        width={320}
                        shadow="md"
                        withArrow
                        openDelay={200}
                        closeDelay={400}
                        zIndex={99999999}
                        
                      >
                        
                  
                    {/* HoverCard should only trigger when hovering over the Avatar and Text */}
                    <Group>
                      <HoverCard.Target>
                      
                  <Group >
                
                      <Avatar
                        // @ts-ignore
                        src={
                          post?.mirrorOn?.by?.metadata?.picture &&
                          "optimized" in post?.mirrorOn?.by?.metadata?.picture
                            ? post.mirrorOn?.by.metadata.picture.optimized?.uri
                            : "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
                        }
                        alt={`${post.mirrorOn?.by?.handle?.localName}'s profile picture`}
                        size="lg"
                        radius="md"
                      />
                      <Text fw={500} size="sm">
                        {post.mirrorOn?.by?.metadata?.displayName ||
                          post.mirrorOn?.by?.handle?.localName}
                      </Text>
                     
                      </Group>
                    
              </HoverCard.Target>
                    </Group>
              
                         
                    <HoverCard.Dropdown>
                      <UnstyledButton component={Link}  href={`/h/${post.by?.handle?.localName}`}>
                            <Group>
                              <Avatar
                                // @ts-ignore
                                src={
                                  post?.mirrorOn?.by?.metadata?.picture &&
                                  "optimized" in post?.mirrorOn?.by?.metadata?.picture
                                    ? post.mirrorOn?.by.metadata.picture.optimized?.uri
                                    : "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
                                }
                                alt={`${post.mirrorOn?.by?.handle?.localName}'s profile picture`}
                                size="lg"
                                radius="md"
                              />
              
                              <div style={{ flex: 1 }}>
                                <Text size="md" fw={500}>
                                  {post.by?.metadata?.displayName ||
                                    post.mirrorOn?.by?.handle?.localName}
                                </Text>
              
                                <Text c="dimmed" size="sm">
                                  @{post.mirrorOn?.by?.handle?.localName}
                                </Text>
                              </div>
                            </Group>
                            </UnstyledButton>
                            <Space h="md" />
                            <Text lineClamp={3} fw={200}>
                              {
                                // @ts-ignore
                                post.mirrorOn.by.metadata?.bio || null
                              }
                            </Text>
                            <Space h="md" />
                            <Group justify="center">
                              <Text fw={500} size="sm">
                                {
                                  // @ts-ignore
                                  post.mirrorOn.by.stats.followers || "0"
                                }{" "}
                                Followers
                              </Text>
                              |
                              <Text fw={500} size="sm">
                                {
                                  // @ts-ignore
                                  post.mirrorOn.by.stats.following || "0"
                                }{" "}
                                Following
                              </Text>
                            </Group>
                          </HoverCard.Dropdown>
                        
                      </HoverCard>
              
                      
                      <Space h="xs"/>
              
                      <Spoiler
                          maxHeight={100}
                          showLabel="Show more" hideLabel="Hide" 
                        >
                          <Text
                              size="md"
                              style={{
                            maxWidth: "100%",  // Ensure message text does not overflow
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "normal",  // Allow text to wrap
                            wordWrap: "break-word",
                           
                              }}
                              
                              dangerouslySetInnerHTML={{
                                __html:
                                  // @ts-ignore
                                  post?.mirrorOn?.metadata?.content
                                    ? replaceURLs(
                                        // @ts-ignore
                                        post.mirrorOn.metadata.content.replace(/\n/g, "<br> "),
                                      )
                                    : "",
                              }}
                            />
                            </Spoiler>
              
                            {
                        // @ts-ignore
                        post.mirrorOn.metadata?.asset?.image && (
                          
                            <Image
                              // @ts-ignore
                              src={post?.mirrorOn.metadata?.asset?.image?.optimized?.uri}
                              radius="xs"
                              
                              style={{
                                width: "100%", // Width is 100% of the container
                                maxWidth: "100%", // Ensures the image doesn't scale beyond its original size
                                maxHeight: "888px",
                              }}
                              alt={`${post.mirrorOn.by?.handle?.localName}'s Post Image`}
                            />
                       
                        )
                      }
                    </Paper>
              </UnstyledButton>
              )}

              </Paper>
              </UnstyledButton>
              
      <Space h="md" />
    </>
  );
}