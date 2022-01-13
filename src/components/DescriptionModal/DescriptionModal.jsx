import React, { useCallback } from "react";
import { Layout, Modal, TextContainer, Heading, Subheading } from '@shopify/polaris'

function ModalTitle({ title, date }) {
  return (
    <TextContainer spacing="tight">
      <Heading>{title}</Heading>
      <Subheading>{date}</Subheading>
    </TextContainer>
  )
}

function DescriptionModal({ open, setOpen, title, description, imageUrl, date }) {
  const handleChange = useCallback(() => setOpen(!open), [open]);

  return (
    <div style={{ height: '500px' }}>
      <Modal
        large
        open={open}
        onClose={handleChange}
        title={<ModalTitle title={title} date={date} />}
        primaryAction={{
          content: 'Close',
          onAction: handleChange,
        }}
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
    </div>
  );
}

export default DescriptionModal;