import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import {
  Table,
  Button,
  Container,
  Tabs,
  Tab,
  Alert,
  Form,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import BASE_URL from "../../config";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [graffiti, setGraffiti] = useState([]);
  const [streetArt, setStreetArt] = useState([]);
  const [tags, setTags] = useState([]);
  const [originalGraffiti, setOriginalGraffiti] = useState([]);
  const [originalStreetArt, setOriginalStreetArt] = useState([]);
  const [originalTags, setOriginalTags] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [activeImageTab, setActiveImageTab] = useState("graffiti");
  const [error, setError] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    year: "",
    artist: "",
    uploadedBy: "",
  });
  const [userSearch, setUserSearch] = useState(""); // Stato per la ricerca di utenti
  const [filteredUsers, setFilteredUsers] = useState(users); // Stato per utenti filtrati
  const [selectedImage, setSelectedImage] = useState(null); // Immagine selezionata
  const [showModal, setShowModal] = useState(false); // Stato per mostrare la modale

  const handleImageClick = (image) => {
    setSelectedImage(image); // Imposta l'immagine selezionata
    setShowModal(true); // Mostra la modale
  };

  const handleCloseModal = () => {
    setSelectedImage(null); // Resetta l'immagine selezionata
    setShowModal(false); // Chiudi la modale
  };

  // Fetch users with stats
  useEffect(() => {
    const fetchUsersAndStats = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/users/admin-stats`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok)
          throw new Error("Errore nel caricamento degli utenti");

        const usersWithStats = await response.json();
        setUsers(usersWithStats);
        setFilteredUsers(usersWithStats); // Imposta anche i dati filtrati inizialmente
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsersAndStats();
  }, []);

  // Fetch graffiti
  useEffect(() => {
    fetch(`${BASE_URL}/api/graffiti`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("Errore nel caricamento dei graffiti");
        return response.json();
      })
      .then((data) => {
        setGraffiti(Array.isArray(data) ? data : []);
        setOriginalGraffiti(Array.isArray(data) ? data : []);
      })
      .catch((error) => setError(error.message));
  }, []);

  // Fetch street art
  useEffect(() => {
    fetch(`${BASE_URL}/api/streetart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("Errore nel caricamento della street art");
        return response.json();
      })
      .then((data) => {
        setStreetArt(Array.isArray(data) ? data : []);
        setOriginalStreetArt(Array.isArray(data) ? data : []);
      })
      .catch((error) => setError(error.message));
  }, []);

  // Fetch tags
  useEffect(() => {
    fetch(`${BASE_URL}/api/tags`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Errore nel caricamento dei tag");
        return response.json();
      })
      .then((data) => {
        setTags(Array.isArray(data) ? data : []);
        setOriginalTags(Array.isArray(data) ? data : []);
      })
      .catch((error) => setError(error.message));
  }, []);

  // Delete user
  const deleteUser = (userId) => {
    fetch(`${BASE_URL}/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("Errore nella cancellazione dell'utente");
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => setError(error.message));
  };

  // Delete image
  const deleteImage = (imageId, category) => {
    const endpoint =
      category === "graffiti"
        ? "graffiti"
        : category === "streetart"
        ? "streetart"
        : "tags";

    fetch(`${BASE_URL}/api/${endpoint}/${imageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("Errore nella cancellazione dell'immagine");
        if (category === "graffiti")
          setGraffiti(graffiti.filter((image) => image.id !== imageId));
        if (category === "streetart")
          setStreetArt(streetArt.filter((image) => image.id !== imageId));
        if (category === "tags")
          setTags(tags.filter((image) => image.id !== imageId));
      })
      .catch((error) => setError(error.message));
  };

  const handleSearch = (category) => {
    let filteredData;
    if (category === "graffiti") filteredData = originalGraffiti;
    if (category === "streetart") filteredData = originalStreetArt;
    if (category === "tags") filteredData = originalTags;

    if (searchCriteria.artist) {
      filteredData = filteredData.filter((image) =>
        image.artista
          ?.toLowerCase()
          .includes(searchCriteria.artist.toLowerCase())
      );
    }

    if (searchCriteria.year) {
      filteredData = filteredData.filter(
        (image) =>
          parseInt(image.annoCreazione) === parseInt(searchCriteria.year)
      );
    }

    if (searchCriteria.uploadedBy) {
      filteredData = filteredData.filter((image) =>
        image.username
          ?.toLowerCase()
          .includes(searchCriteria.uploadedBy.toLowerCase())
      );
    }

    if (category === "graffiti") setGraffiti(filteredData);
    if (category === "streetart") setStreetArt(filteredData);
    if (category === "tags") setTags(filteredData);
  };
  const handleUserSearch = () => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearch.toLowerCase())
    );
    setFilteredUsers(filtered);
  };
  const resetSearch = () => {
    setSearchCriteria({ year: "", artist: "", uploadedBy: "" });
    setGraffiti(originalGraffiti);
    setStreetArt(originalStreetArt);
    setTags(originalTags);
  };

  const resetUserSearch = () => {
    setFilteredUsers(users); // Reimposta i risultati originali
    setUserSearch(""); // Pulisce il campo di ricerca
  };

  return (
    <Container className="admin-dashboard">
      <h1 className="text-center">Admin Dashboard</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      <Tabs
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key)}
        className="mb-3"
      >
        <Tab eventKey="users" title="Gestisci Utenti">
          <h2>Gestisci Utenti</h2>
          <Form inline className="mb-3">
            <Form.Control
              type="text"
              placeholder="Cerca per username o email"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="mr-2"
            />
            <Button
              variant="primary"
              onClick={handleUserSearch}
              className="mr-2"
            >
              Cerca
            </Button>
            <Button variant="secondary" onClick={resetUserSearch}>
              Reset
            </Button>
          </Form>
          {filteredUsers.length === 0 ? (
            <p className="text-center">Nessun utente trovato.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Totale Immagini</th>
                  <th>Azione</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.totalImageCount || 0}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => deleteUser(user.id)}
                      >
                        Elimina
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>
        <Tab eventKey="images" title="Gestisci Immagini">
          <h2>Gestisci Immagini</h2>
          <Button
            variant="primary"
            className="mb-3"
            onClick={() => setShowSearch(!showSearch)}
          >
            Ricerca
          </Button>
          <Button
            variant="secondary"
            className="mb-3 ms-2"
            onClick={resetSearch}
          >
            Reset
          </Button>
          {showSearch && (
            <Card className="mb-4 p-3">
              <h5>Filtra Immagini</h5>
              <Form>
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="searchYear">
                      <Form.Label>Anno</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Inserisci l'anno"
                        value={searchCriteria.year}
                        onChange={(e) =>
                          setSearchCriteria({
                            ...searchCriteria,
                            year: e.target.value,
                          })
                        }
                      />
                      <Button
                        variant="info"
                        className="mt-2"
                        onClick={() => handleSearch(activeImageTab)}
                      >
                        Cerca
                      </Button>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="searchArtist">
                      <Form.Label>Artista</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Inserisci artista"
                        value={searchCriteria.artist}
                        onChange={(e) =>
                          setSearchCriteria({
                            ...searchCriteria,
                            artist: e.target.value,
                          })
                        }
                      />
                      <Button
                        variant="info"
                        className="mt-2"
                        onClick={() => handleSearch(activeImageTab)}
                      >
                        Cerca
                      </Button>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="searchUploadedBy">
                      <Form.Label>Caricato da</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Inserisci utente"
                        value={searchCriteria.uploadedBy}
                        onChange={(e) =>
                          setSearchCriteria({
                            ...searchCriteria,
                            uploadedBy: e.target.value,
                          })
                        }
                      />
                      <Button
                        variant="info"
                        className="mt-2"
                        onClick={() => handleSearch(activeImageTab)}
                      >
                        Cerca
                      </Button>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card>
          )}
          <Tabs
            activeKey={activeImageTab}
            onSelect={(key) => setActiveImageTab(key)}
            className="mb-3"
          >
            <Tab eventKey="graffiti" title="Graffiti">
              {graffiti.length === 0 ? (
                <p className="text-center">Nessun graffito trovato.</p>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Immagine</th>
                      <th>Artista</th>
                      <th>Data</th>
                      <th>Luogo</th>
                      <th>Caricato da</th>
                      <th>Azione</th>
                    </tr>
                  </thead>
                  <tbody>
                    {graffiti.map((image) => (
                      <tr key={image.id}>
                        <td>
                          <img
                            src={image.immagineUrl}
                            alt="Graffito"
                            width="100"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleImageClick(image)}
                          />
                        </td>
                        <td>{image.artista || "Sconosciuto"}</td>
                        <td>{image.annoCreazione || "Sconosciuta"}</td>
                        <td>{image.luogo || "Sconosciuto"}</td>
                        <td>{image.username || "Anonimo"}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => deleteImage(image.id, "graffiti")}
                          >
                            Elimina
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Tab>
            <Tab eventKey="streetart" title="Street Art">
              {streetArt.length === 0 ? (
                <p className="text-center">Nessuna street art trovata.</p>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Immagine</th>
                      <th>Artista</th>
                      <th>Data</th>
                      <th>Luogo</th>
                      <th>Caricato da</th>
                      <th>Azione</th>
                    </tr>
                  </thead>
                  <tbody>
                    {streetArt.map((image) => (
                      <tr key={image.id}>
                        <td>
                          <img
                            src={image.immagineUrl}
                            alt="Street Art"
                            width="100"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleImageClick(image)}
                          />
                        </td>
                        <td>{image.artista || "Sconosciuto"}</td>
                        <td>{image.annoCreazione || "Sconosciuta"}</td>
                        <td>{image.luogo || "Sconosciuto"}</td>
                        <td>{image.username || "Anonimo"}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => deleteImage(image.id, "streetart")}
                          >
                            Elimina
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Tab>
            <Tab eventKey="tags" title="Tag">
              {tags.length === 0 ? (
                <p className="text-center">Nessun tag trovato.</p>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Immagine</th>
                      <th>Artista</th>
                      <th>Data</th>
                      <th>Luogo</th>
                      <th>Caricato da</th>
                      <th>Azione</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tags.map((image) => (
                      <tr key={image.id}>
                        <td>
                          <img
                            src={image.immagineUrl}
                            alt="Tag"
                            width="100"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleImageClick(image)}
                          />
                        </td>
                        <td>{image.artista || "Sconosciuto"}</td>
                        <td>{image.annoCreazione || "Sconosciuta"}</td>
                        <td>{image.luogo || "Sconosciuto"}</td>
                        <td>{image.username || "Anonimo"}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => deleteImage(image.id, "tags")}
                          >
                            Elimina
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Tab>
          </Tabs>
        </Tab>
      </Tabs>

      {selectedImage && (
        <div
          className="modal-overlay-admin"
          onClick={handleCloseModal} // Chiudi la modale quando si clicca all'esterno
        >
          <div
            className="modal-content-admin"
            onClick={(e) => e.stopPropagation()} // Impedisce la chiusura cliccando all'interno
          >
            <img src={selectedImage.immagineUrl} alt="Immagine Ingrandita" />
          </div>
        </div>
      )}
    </Container>
  );
}

export default AdminDashboard;
