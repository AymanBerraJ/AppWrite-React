import React, { useState, useEffect } from "react";
import { database, storage } from "./appWriteConfig";

const Home = () => {
  const [element, setElement] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [elementSelected, setElementSelected] = useState(null);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = null;

      // Upload image if it exists
      if (image) {
        const file = await storage.createFile(
          import.meta.env.VITE_STORAGE_ID,
          "unique()",
          image
        );
        imageUrl = storage.getFileView(import.meta.env.VITE_STORAGE_ID, file.$id);
      }

      const response = await database.createDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        "unique()",
        {
          title: title,
          description: description,
          completed: false,
          foodImg: imageUrl,
        }
      );
      alert("Document created: " + response.$id);

      setTitle("");
      setDescription("");
      setImage(null);
      init(); // Refresh the list after adding a new item
    } catch (error) {
      alert("Error creating Document: " + error.message);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await database.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID
    );

    setElement(response.documents);
  };

  const clickTitle = (element) => {
    setElementSelected(element);
    setModalOpen(true);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const recupData = () => {
    return element.map((elements) => (
      <div
        key={elements.$id}
        className="flex justify-center hover:bg-gray-400 hover:text-white hover:border-white border border-black p-4 m-2 w-[200px] rounded-md cursor-pointer text-2xl font-bold"
        onClick={() => clickTitle(elements)}
      >
        {elements.foodImg ? (
          <img src={elements.foodImg} alt="" className="w-full h-auto rounded-md" />
        ) : (
          <h1>{elements.title}</h1>
        )}
      </div>
    ));
  };

  const closeModal = () => {
    setModalOpen(false);
    setElementSelected(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Create a Recipe</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Name of the Food:</label>
            <input
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="food..."
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Recipe:</label>
            <textarea
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 h-24"
              placeholder="Enter the recipe..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Upload an Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="space-y-2">
            <button
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {recupData()}
        </div>

        {modalOpen && elementSelected && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full">
              <h2 className="text-2xl font-bold mb-4">{elementSelected.title}</h2>
              <p className="text-gray-700">{elementSelected.description}</p>
              <button
                className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
