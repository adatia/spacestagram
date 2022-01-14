import React, { useState } from 'react';
import { MediaCard } from '@shopify/polaris';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import DescriptionModal from '../DescriptionModal/DescriptionModal';

function Photo({ post, focusedPhoto, setFocusedPhoto }) {
  const [liked, setLiked] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  return (<>
    <MediaCard id={post.imageUrl} title={post.title} primaryAction={{
      icon: liked ? <FontAwesomeIcon icon={fasHeart} size='2x' color='red' transform="left-2" className={focusedPhoto === post.imageUrl ? 'fa-beat' : ''} /> : <FontAwesomeIcon icon={farHeart} size='2x' color='red' transform="left-2" className={focusedPhoto === post.imageUrl ? 'fa-beat' : ''} />,
      content: liked ? 'Unlike' : 'Like',
      onAction: () => {
        setLiked(!liked);
        console.log(liked);
      },
      onMouseEnter: () => {
        setFocusedPhoto(post.imageUrl);
      },
    }}
      secondaryAction={{
        content: 'View Description',
        onAction: () => {
          setDescriptionOpen(true);
        },

      }}
      description={post.date} portrait={true} size="small" >
      <img alt="" width="100%" height="100%" style={{
        objectFit: 'cover',
        objectPosition: 'center'
      }} src={post.imageUrl} />
    </MediaCard >
    <DescriptionModal open={descriptionOpen} setOpen={setDescriptionOpen} title={post.title} description={post.description} imageUrl={post.imageUrl} date={post.date} liked={liked} setLiked={setLiked} focusedPhoto={focusedPhoto} setFocusedPhoto={setFocusedPhoto} />
  </>
  );
};

export default Photo;