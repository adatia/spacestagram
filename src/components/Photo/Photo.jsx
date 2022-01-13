import React, { useState } from 'react';
import { MediaCard } from '@shopify/polaris';

function Photo({ post }) {
  const [liked, setLiked] = useState(false);

  return (
    <MediaCard title={post.title} primaryAction={{
      content: liked ? 'Unlike' : 'Like',
      onAction: () => {
        setLiked(!liked);
        console.log(liked);
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