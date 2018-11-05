// ModalConfirmDelete.js
import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default ({message, onOk, onCancel, open}) => <Modal
                open={!!open}
                onClose={onCancel}
                basic
                size='small'
            >
                <Header icon='browser' content={message} />                
                <Modal.Actions>
                    <Button color='red' onClick={onCancel} inverted>
                        <Icon name='checkmark' /> Cancel
                    </Button>
                    <Button color='green' onClick={onOk} inverted>
                        <Icon name='checkmark' /> Ok!
                    </Button>
                </Modal.Actions>
            </Modal>