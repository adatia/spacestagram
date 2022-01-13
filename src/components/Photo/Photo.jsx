import React, { useState } from 'react';
import { MediaCard } from '@shopify/polaris';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

function Photo({ post }) {
  const [liked, setLiked] = useState(false);

  return (
    <MediaCard title={post.title} primaryAction={{
      icon: liked ? <FontAwesomeIcon icon={fasHeart} size='2x' color='red' transform="left-2" /> : <FontAwesomeIcon icon={farHeart} size='2x' color='red' transform="left-2" />,
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