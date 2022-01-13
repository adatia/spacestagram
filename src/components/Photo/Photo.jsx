import React from 'react';
import { MediaCard } from '@shopify/polaris';

function Photo({ post }) {
  return (
    <MediaCard title={post.title} primaryAction={{
      content: post.liked ? 'Unlike' : 'Like',
      onAction: () => {
        post.liked = !post.liked;
        console.log(post.liked);
      }
    }} description={post.description} portrait={true} size="small">
      <img alt="" width="100%" height="100%" style={{
        objectFit: 'cover',
        objectPosition: 'center'
      }} src={post.imageUrl} />
    </MediaCard>
  );
};

export default Photo;