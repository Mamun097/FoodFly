import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

export default function (props) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDelete = () => {
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/restaurant/deletefood/${props._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) {
        window.location.href = "/restaurant/foods";
        console.log("Food item deleted successfully");
      } else {
        console.log("Failed to delete food item");
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };
  const cancelDelete = () => {
    setShowConfirmModal(false);
  };

  // E D I T    F O O D    P A R T
  // create a state to track whether the edit modal is open or not,
  // and another state to hold the edited data temporarily before sending it to the server.
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedFood, setEditedFood] = useState({
    name: props.name,
    CategoryName: props.CategoryName,
    price: props.price,
    img: props.img,
  });

  const handleEditChange = (event) => {
    setEditedFood({ ...editedFood, [event.target.name]: event.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/restaurant/editfood/${props._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedFood),
        }
      );

      if (response.status === 200) {
        // Close the modal after successful edit
        setShowEditModal(false);
        window.location.href = "/restaurant/foods";
      } else {
        console.log("Failed to edit food item");
      }
    } catch (error) {
      console.error("Error editing food item:", error);
    }
  };

  //Card e hover effect add korar jonno
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const cardStyle = {
    width: "16rem",
    maxHeight: "360px",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.1s ease-in-out",
  };

  //stock out part
  const [isInStock, setIsInStock] = useState(props.is_instock); // State to track Stock Out status

  const handleStockOutToggle = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/fooditems/stockout/${props._id}`,
        {
          method: "PUT",
        }
      );

      if (response.status === 200) {
        setIsInStock(!isInStock); // Toggle the Stock Out status
        console.log("Stock Out status updated successfully");
      } else {
        console.log("Failed to update Stock Out status");
      }
    } catch (error) {
      console.error("Error updating Stock Out status:", error);
    }
  };

  //I S O P E N

  const handleStockAndRestaurantStatusToggle = async () => {
    try {
      const restaurantId = props.restaurantId; // Assume restaurantId is passed as a prop
      const foodId = props._id;

      const response = await fetch(
        `http://localhost:5000/api/restaurant/updateStock/${foodId}/${restaurantId}`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inStock: !isInStock }) // Toggle the stock status before sending
        }
      );

      if (response.status === 200) {
        console.log("Stock Out status and restaurant is_open field updated successfully");
      } else {
        console.log("Failed to update Stock Out status and restaurant is_open field");
      }
    } catch (error) {
      console.error("Error updating Stock Out status:", error);
    }
  };

  useEffect(() => {
    // Calling the function when isInStock changes
    handleStockAndRestaurantStatusToggle();
  }, [isInStock]);

  return (
    <div>
      <div
        className="card mt-2"
        style={cardStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={props.img}
          className="card-img-top"
          alt="..."
          style={{ maxHeight: "140px", objectFit: "cover" }}
        />
        <div
          className="card-body"
          style={{ boxShadow: "0px 4px 8px rgba(1, 1, 1, 0.2)" }}
        >
          <h6 className="card-title">{props.name}</h6>

          <div className="h-100 fs-6">Tk {props.price}</div>

          <div className="form-check form-switch mt-2">
            <input
              className="form-check-input"
              style={{ cursor: "pointer", backgroundColor: isInStock ? "transparent" : "#ff8a00" }}
              type="checkbox"
              id={`stockout-${props._id}`}
              checked={!isInStock} // Use the state variable here
              onChange={handleStockOutToggle} // Toggle the status when the checkbox is changed
            />
            <label
              className="stockout-label"
              htmlFor={`stockout-${props._id}`}
            >
              Stock Out
            </label>
          </div>

          <div className="d-flex flex-row justify-content mt-1">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              style={{ marginRight: "10px" }}
              onClick={handleDelete}
            >
              Delete
            </button>

            <button
              type="button"
              className="btn btn-outline-success btn-sm mr-2"
              onClick={() => setShowEditModal(true)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showConfirmModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", background: "rgba(0, 0, 0, 0.7)" }}
        >
          <div
            className="modal-dialog"
            role="document"
            style={{ marginTop: "10%" }}
          >
            <div className="modal-content">
              <div className="modal-body">
                <h5>Are you sure you want to Delete this food?</h5>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {showEditModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", background: "rgba(0, 0, 0, 0.7)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="EditFoodModalLabel">
                  Edit Food
                </h3>
              </div>
              <div className="modal-body">
                {/* Form with input fields */}
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={editedFood.name}
                      onChange={handleEditChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Food Category"
                      name="CategoryName"
                      value={editedFood.CategoryName}
                      onChange={handleEditChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Price"
                      name="price"
                      value={editedFood.price}
                      onChange={handleEditChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Image Link"
                      name="img"
                      value={editedFood.img}
                      onChange={handleEditChange}
                    />
                  </Form.Group>
                </Form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={handleEditSubmit} // Create this function
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
