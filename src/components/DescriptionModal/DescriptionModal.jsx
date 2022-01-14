import React, { useCallback } from "react";
import { Layout, Modal, TextContainer, Heading, Subheading } from '@shopify/polaris'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

function ModalTitle({ title, date }) {
  return (
    <TextContainer spacing="tight">
      <Heading>{title}</Heading>
      <Subheading>{date}</Subheading>
    </TextContainer>
  )
}

function DescriptionModal({ open, setOpen, title, description, imageUrl, date, liked, setLiked, focusedPhoto, setFocusedPhoto }) {
  const handleChange = useCallback(() => setOpen(!open), [open]);

  return (
      <Modal
        large
        open={open}
        onClose={handleChange}
        title={<ModalTitle title={title} date={date} />}
        primaryAction={{
          content: 'Close',
          onAction: handleChange,
        }}
        secondaryActions={[
          {
            icon: liked ? <FontAwesomeIcon icon={fasHeart} color='red' transform="left-2 down-1" className={focusedPhoto === imageUrl ? 'fa-beat' : ''} /> : <FontAwesomeIcon icon={farHeart} color='red' transform="left-2 down-1" className={focusedPhoto === imageUrl ? 'fa-beat' : ''} />,
            content: liked ? 'Unlike' : 'Like',
            onAction: () => {
              setLiked(!liked);
            },
            onMouseEnter: () => {
              setFocusedPhoto(imageUrl);
            },
          },
        ]}
      >
        <Modal.Section>
          <Layout>
            <Layout.Section secondary>
              <img alt="" width="100%" height="100%" src={imageUrl} />
            </Layout.Section>
            <Layout.Section>
              <TextContainer>
                <p>{description}</p>
              </TextContainer>
            </Layout.Section>
          </Layout>
        </Modal.Section>
      </Modal>
  );
}

export default DescriptionModal;