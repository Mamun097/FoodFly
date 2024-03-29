import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function EditFoodModal({ show, onHide, food }) {
  const [editedFood, setEditedFood] = useState(food);

  const handleFieldChange = (field, value) => {
    setEditedFood({ ...editedFood, [field]: value });
  };

  const handleSave = async () => {
    try {
        const response = await fetch(`https://foodfly.onrender.com/api/restaurant/editfood/${food._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedFood),
        });
    
        if (response.status === 200) {
          // Success, close the modal or show a success message
          onHide();
        } else {
          // Handle error response
          console.log('Failed to update food item');
        }
      } catch (error) {
        console.error('Error updating food item', error);
      }

    // Then close the modal
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Food</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={editedFood.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={editedFood.price}
              onChange={(e) => handleFieldChange('price', e.target.value)}
            />
          </Form.Group>
          {/* Add more Form.Group elements for other fields */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
