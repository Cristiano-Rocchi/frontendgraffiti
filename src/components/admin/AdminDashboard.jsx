import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import { Table, Button, Container, Tabs, Tab, Alert } from "react-bootstrap";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [graffiti, setGraffiti] = useState([]);
  const [streetArt, setStreetArt] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [activeImageTab, setActiveImageTab] = useState("graffiti");
  const [error, setError] = useState("");

  // Carica gli utenti
  useEffect(() => {
    fetch("http://localhost:3001/api/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("Errore nel caricamento degli utenti");
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => setError(error.message));
  }, []);

  // Carica i graffiti
  useEffect(() => {
    fetch("http://localhost:3001/api/graffiti", {
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
      .then((data) => setGraffiti(Array.isArray(data) ? data : []))
      .catch((error) => setError(error.message));
  }, []);

  // Carica la street art
  useEffect(() => {
    fetch("http://localhost:3001/api/streetart", {
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
      .then((data) => setStreetArt(Array.isArray(data) ? data : []))
      .catch((error) => setError(error.message));
  }, []);

  // Carica i tag
  useEffect(() => {
    fetch("http://localhost:3001/api/tags", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Errore nel caricamento dei tag");
        return response.json();
      })
      .then((data) => setTags(Array.isArray(data) ? data : []))
      .catch((error) => setError(error.message));
  }, []);

  // Elimina utente
  const deleteUser = (userId) => {
    fetch(`http://localhost:3001/api/users/${userId}`, {
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

  // Elimina immagine
  const deleteImage = (imageId, category) => {
    const endpoint =
      category === "graffiti"
        ? "graffiti"
        : category === "streetart"
        ? "streetart"
        : "tags";

    fetch(`http://localhost:3001/api/${endpoint}/${imageId}`, {
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

  return (
    <Container className="admin-dashboard">
      <h1 className="text-center">Admin Dashboard</h1>

      {/* Messaggio di errore */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Tabs per navigare tra le sezioni */}
      <Tabs
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key)}
        className="mb-3"
      >
        <Tab eventKey="users" title="Gestisci Utenti">
          <h2>Gestisci Utenti</h2>
          {users.length === 0 ? (
            <p className="text-center">Nessun utente trovato.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Azione</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) &&
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
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
                    {Array.isArray(graffiti) &&
                      graffiti.map((image) => (
                        <tr key={image.id}>
                          <td>
                            <img
                              src={image.immagineUrl}
                              alt="Graffito"
                              width="100"
                            />
                          </td>
                          <td>{image.artista || "Sconosciuto"}</td>
                          <td>{image.dataCreazione || "Sconosciuta"}</td>
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
                    {Array.isArray(streetArt) &&
                      streetArt.map((image) => (
                        <tr key={image.id}>
                          <td>
                            <img
                              src={image.immagineUrl}
                              alt="Street Art"
                              width="100"
                            />
                          </td>
                          <td>{image.artista || "Sconosciuto"}</td>
                          <td>{image.dataCreazione || "Sconosciuta"}</td>
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
                    {Array.isArray(tags) &&
                      tags.map((image) => (
                        <tr key={image.id}>
                          <td>
                            <img
                              src={image.immagineUrl}
                              alt="Tag"
                              width="100"
                            />
                          </td>
                          <td>{image.artista || "Sconosciuto"}</td>
                          <td>{image.dataCreazione || "Sconosciuta"}</td>
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
    </Container>
  );
}

export default AdminDashboard;
