import { useState, useEffect } from "react";

function App() {
    const [product, setProduct] = useState([]);
    const [viewer1, setViewer1] = useState(false);
    const [oneProduct, setOneProduct] = useState([]);
    const [delProduct, setDelProduct] = useState([]);
    const [updateProduct, setUpdateProduct] = useState([]);
    const [viewer2, setViewer2] = useState(false);
    const [viewer3, setViewer3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [addNewProduct, setAddNewProduct] = useState({
      _id: 0,
      title: "",
      price: 0.0,
      description: "",
      category: "",
      image: "http://127.0.0.1:4000/images/",
      rating: { rate: 0.0, count: 0 },
    });
    const [viewer4, setViewer4] = useState(false);
    const [page, setPage] = useState(0);            // 0 : Create, 1 : Read, 2 : Update, 3 : Delete, 4 : Credits
    let newPrice = "";

    const showAllItems = product.map((el) => (
      <div className="row border-top border-bottom" key={el._id}>
          <div className="row main align-items-center">
              <div className="col-2">
                  <img className="img-fluid" src={el.image} />
              </div>
              <div className="col">
                  <div className="row">{el.title}</div> <br />
                  
                  <div className="row">&nbsp;&nbsp;&nbsp;&nbsp;{el.description}</div> <br />
                  <div className="row text-muted">{el.category}, id: {el._id}</div>
              </div>
              <div className="col">
                  Rating: {el.rating.rate} / 5 <br />
                  <div className="row text-muted">{el.rating.count} ratings</div>
              </div>
              <div className="col">
                  ${el.price}
              </div>
          </div>
      </div>
    ));

    const showOneItem = oneProduct.map((el) => (
        <div className="row border-top border-bottom" key={el._id}>
            <div className="row main align-items-center">
                <div className="col-2">
                    <img className="img-fluid" src={el.image} />
                </div>
                <div className="col">
                    <div className="row">{el.title}</div> <br />
                    
                    <div className="row">&nbsp;&nbsp;&nbsp;&nbsp;{el.description}</div> <br />
                    <div className="row text-muted">{el.category}, id: {el._id}</div>
                </div>
                <div className="col">
                    Rating: {el.rating.rate} / 5 <br />
                    <div className="row text-muted">{el.rating.count} ratings</div>
                </div>
                <div className="col">
                    ${el.price}
                </div>
            </div>
        </div>
    ));

    const showUpdateItem = updateProduct.map((el) => (
      <div className="row border-top border-bottom" key={el._id}>
          <div className="row main align-items-center">
              <div className="col-2">
                  <img className="img-fluid" src={el.image} />
              </div>
              <div className="col">
                  <div className="row">{el.title}</div> <br />
                  
                  <div className="row">&nbsp;&nbsp;&nbsp;&nbsp;{el.description}</div> <br />
                  <div className="row text-muted">{el.category}, id: {el._id}</div>
              </div>
              <div className="col">
                  Rating: {el.rating.rate} / 5 <br />
                  <div className="row text-muted">{el.rating.count} ratings</div>
              </div>
              <div className="col">
                  ${el.price}
              </div>
          </div>
      </div>
    ));

    const showDelItem = delProduct.map((el) => (
      <div className="row border-top border-bottom" key={el._id}>
          <div className="row main align-items-center">
              <div className="col-2">
                  <img className="img-fluid" src={el.image} />
              </div>
              <div className="col">
                  <div className="row">{el.title}</div> <br />
                  
                  <div className="row">&nbsp;&nbsp;&nbsp;&nbsp;{el.description}</div> <br />
                  <div className="row text-muted">{el.category}, id: {el._id}</div>
              </div>
              <div className="col">
                  Rating: {el.rating.rate} / 5 <br />
                  <div className="row text-muted">{el.rating.count} ratings</div>
              </div>
              <div className="col">
                  ${el.price}
              </div>
          </div>
      </div>
    ));
    
    function getAllProducts() {
        fetch("http://localhost:4000/")
        .then((response) => response.json())
        .then((data) => {
            console.log("Show Catalog of Products :");
            console.log(data);
            setProduct(data);
        });
        setViewer1(!viewer1);
    }

    function getOneProduct(id) {
      console.log(id);
      if (id >= 1 && id <= 20) {
        fetch("http://localhost:4000/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setOneProduct(dataArr);
          setViewer2(true);
        });
      } else {
        console.log("Wrong number of Product id.");
        setOneProduct([]);
        setViewer2(false);
      }
    }

    function getProductForUpdate(id) {
      console.log(id);
      if (id >= 1 && id <= 20) {
        fetch("http://localhost:4000/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setUpdateProduct(dataArr);
          setViewer3(true);
        });
      } else {
        console.log("Wrong number of Product id.");
        setUpdateProduct([]);
        setViewer3(false);
      }
    }

    function getProductForDelete(id) {
      console.log(id);
      if (id >= 1 && id <= 20) {
        fetch("http://localhost:4000/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setDelProduct(dataArr);
          setViewer4(true);
        });
      } else {
        console.log("Wrong number of Product id.");
        setDelProduct([]);
        setViewer4(false);
      }
    }

    function handleChange(evt) {
        const value = evt.target.value;
        if (evt.target.name === "_id") {
            setAddNewProduct({ ...addNewProduct, _id: value });
        } else if (evt.target.name === "title") {
            setAddNewProduct({ ...addNewProduct, title: value });
        } else if (evt.target.name === "price") {
            setAddNewProduct({ ...addNewProduct, price: value });
        } else if (evt.target.name === "description") {
            setAddNewProduct({ ...addNewProduct, description: value });
        } else if (evt.target.name === "category") {
            setAddNewProduct({ ...addNewProduct, category: value });
        } else if (evt.target.name === "image") {
            const temp = value;
            setAddNewProduct({ ...addNewProduct, image: temp });
        } else if (evt.target.name === "rate") {
            setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
        } else if (evt.target.name === "count") {
            const temp = addNewProduct.rating.rate;
            setAddNewProduct({
                ...addNewProduct,
                rating: { rate: temp, count: value },
            });
        }
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(e.target.value);
        fetch("http://localhost:4000/insert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(addNewProduct),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Post a new product completed");
            console.log(data);
            if (data) {
                const value = Object.values(data);
                alert(value);
                setChecked4(!checked4);
            }
        });
    }

    function updateOneProduct(updateID, updatePrice) {
      console.log(updateID + " " + updatePrice);
      fetch("http://localhost:4000/" + updateID + "/" + updatePrice)
      .then((response) => response.json())
      .then((data) => {
        console.log("Update one product :", updateID);
        console.log(data);
        if (data) {
            const value = Object.values(data);
            alert(value);
            setUpdateProduct([]);
        }
        setChecked4(!checked4);
      });
    }

    function deleteOneProduct(deleteid) {
        console.log("Product to delete :", deleteid);
        fetch("http://localhost:4000/delete/", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id: deleteid }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Delete a product completed : ", deleteid);
            console.log(data);
            if (data) {
                //const keys = Object.keys(data);
                const value = Object.values(data);
                alert(value);
                setDelProduct([]);
            }
            setChecked4(!checked4);
        });
    }

    useEffect(() => {
      getAllProducts();
      getOneProduct();
      getProductForUpdate();
      getProductForDelete();
    }, [checked4]);

    if (page == 0) {
      return (
          <div>
              <h1>Catalog of Products : Create</h1>
              <div>
                <button type="button" variant="light" onClick={() => setPage(0)}>Create Product Page</button>
                <button type="button" variant="light" onClick={() => setPage(1)}>Read Products Page</button>
                <button type="button" variant="light" onClick={() => setPage(2)}>Update Product Page</button>
                <button type="button" variant="light" onClick={() => setPage(3)}>Delete Product Page</button>
                <button type="button" variant="light" onClick={() => setPage(4)}>Author Details Page</button>
              </div>
              <div>
                <h3>Add a new product :</h3>
                <form action="">
                    <input type="number" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handleChange} />
                    <input type="text" placeholder="title?" name="title" value={addNewProduct.title} onChange={handleChange} />
                    <input type="number" placeholder="price?" name="price" value={addNewProduct.price} onChange={handleChange} />
                    <input type="text" placeholder="description?" name="description" value={addNewProduct.description} onChange={handleChange} />
                    <input type="text" placeholder="category?" name="category" value={addNewProduct.category} onChange={handleChange} />
                    <input type="text" placeholder="image?" name="image" value={addNewProduct.image} onChange={handleChange} />
                    <input type="number" placeholder="rate?" name="rate" value={addNewProduct.rating.rate} onChange={handleChange} />
                    <input type="number" placeholder="count?" name="count" value={addNewProduct.rating.count} onChange={handleChange} />
                    <button type="submit" onClick={handleOnSubmit}>
                        submit
                    </button>
                </form>
              </div>
          </div>
      )
              } else if (page == 1) {
                return (
                    <div>
                        <h1>Catalog of Products : Read</h1>
                        <div>
                          <button type="button" variant="light" onClick={() => setPage(0)}>Create Product Page</button>
                          <button type="button" variant="light" onClick={() => setPage(1)}>Read Products Page</button>
                          <button type="button" variant="light" onClick={() => setPage(2)}>Update Product Page</button>
                          <button type="button" variant="light" onClick={() => setPage(3)}>Delete Product Page</button>
                          <button type="button" variant="light" onClick={() => setPage(4)}>Author Details Page</button>
          
                          <h3>Show all available Products.</h3>
                          <button onClick={() => getAllProducts()}>{viewer1 ? "Hide All Products" : "Show All Products"}</button>
                          <hr></hr>
                          {viewer1 && <div>Products {showAllItems}</div>}
                          <hr></hr>
                        </div>
                        <div>
                          <h3>Show one Product by Id:</h3>
                          <input type="text" id="message1" name="message1" placeholder="id" onChange={(e) =>getOneProduct(e.target.value)} />
                          {viewer2 && <div>Product: {showOneItem}</div>}
                          <hr></hr>
                        </div>
                    </div>
                )

              } else if (page == 2) {
                return (
                    <div>
                        <h1>Catalog of Products : Update</h1>
                        <div>
                          <button type="button" variant="light" onClick={() => setPage(0)}>Create Product Page</button>
                          <button type="button" variant="light" onClick={() => setPage(1)}>Read Products Page</button>
                          <button type="button" variant="light" onClick={() => setPage(2)}>Update Product Page</button>
                          <button type="button" variant="light" onClick={() => setPage(3)}>Delete Product Page</button>
                          <button type="button" variant="light" onClick={() => setPage(4)}>Author Details Page</button>
                        </div>
                        <div>
                          <h3>Update one Product by Id:</h3>
                          <input type="text" id="message2" name="message2" placeholder="id" onChange={(e) =>getProductForUpdate(e.target.value)} />
                          {viewer3 && <input type="text" id="newPrice" name="newPrice" placeholder="New Price" onChange={(e) =>newPrice = e.target.value} />}
                          {viewer3 && <button onClick={() => updateOneProduct(updateProduct[0]._id, newPrice)}>Update</button>}
                          {viewer3 && <div>Product: {showUpdateItem}</div>}
                          <hr></hr>
                        </div>
                    </div>
                )

              } else if (page == 3) {
                return (
                    <div>
                        <h1>Catalog of Products : Delete</h1>
                        <div>
                          <button type="button" variant="light" onClick={() => setPage(0)}>Create Product Page</button>
                          <button type="button" variant="light" onClick={() => setPage(1)}>Read Products Page</button>
                          <button type="button" variant="light" onClick={() => setPage(2)}>Update Product Page</button>
                          <button type="button" variant="light" onClick={() => setPage(3)}>Delete Product Page</button>
                          <button type="button" variant="light" onClick={() => setPage(4)}>Author Details Page</button>
                        </div>
                        <div>
                          <h3>Delete one product:</h3>
                          <input type="text" id="message3" name="message3" placeholder="id" onChange={(e) =>getProductForDelete(e.target.value)} />
                          {viewer4 && <button onClick={() => deleteOneProduct(delProduct[0]._id)}>Delete</button>}
                          {viewer4 && <div>Product: {showDelItem}</div>}
                          <hr></hr>
                        </div>
                    </div>
                )

              } else if (page == 4) {
                    return (
                      <div>
                          <h1>Catalog of Products : Authors</h1>
                          <div>
                            <button type="button" variant="light" onClick={() => setPage(0)}>Create Product Page</button>
                            <button type="button" variant="light" onClick={() => setPage(1)}>Read Products Page</button>
                            <button type="button" variant="light" onClick={() => setPage(2)}>Update Product Page</button>
                            <button type="button" variant="light" onClick={() => setPage(3)}>Delete Product Page</button>
                            <button type="button" variant="light" onClick={() => setPage(4)}>Author Details Page</button>
                          </div>
                          <div>
                            <h1>Team 46</h1>
                            <h3>Benjamin Niklasen : bjn1@iastate.edu</h3>
                            <h3>Kyle Clements : kyle0324@iastate.edu</h3>
                            <br />
                            <h4>Computer Science 319 : Construction of User Interfaces</h4>
                            <h4>Professor : Abraham Aldaco, Ph.D.</h4>
                            <br />
                            <h5>Description : </h5>
                            <p>
                              This project is a fakestore catalog made to implement CRUD functionality on the backend and learn to link it to the frontend.
                              It uses bootstrap to improve the appearance of it while using the standard MERN stack to manage the functionality and data provision.
                              The Create method uses mongoose's create function and is supplied all the necessary information in the body of the requeest header. (/insert)
                              The Read methods use mongoose's find and findOne functions and return the information regarding the documents found.  (/ and /:id)
                              The Update method uses mongoose's findOneAndUpdate function to find the document with the supplied id and update its price to the one given.  (/:id/:newPrice)
                              The Delete method uses mongoose's deleteOne function using the supplied id to find the document to delete.  (/delete)
                              When a document in the database is added, deleted, or modified using the webpage, it reloads the views so there is no out of date cached data. This project was created based on the exercise done in class with additions by Benjamin Niklasen and Kyle Clements to fit the grading requirements of Assignment 3.
                            </p>
                          </div>
                      </div>
                  ) 
              }
} // App end

export default App;