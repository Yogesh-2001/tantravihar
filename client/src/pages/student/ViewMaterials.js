import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Button, Card } from "@material-ui/core";
import Modal from "../../components/Modal";
import { useProfile } from "../../context/ProfileDetailsContext";

const ViewMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [modal, setModal] = useState(false);
  const { setLoading } = useProfile();

  useEffect(() => {
    const fetchMaterials = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/v1/user/get-all-materials/"
      );

      setMaterials(response.data);
    };
    setLoading(true);
    fetchMaterials();
    setLoading(false);
  }, []);

  const handleViewMaterial = (material) => {
    setSelectedMaterial(material);
    setModal(true);
  };
  return (
    <>
      <Paper
        className="col-12 p-3"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <h4 className="form-title">Placement Material</h4>
        <section
          className="d-flex flex-wrap "
          style={{ display: "flex", justifyContent: "center" }}
        >
          {materials?.map((m, index) => (
            <>
              <Card className="col-12 col-md-3 mx-3 p-4 my-3 card_box_shadow card_hover_effect d-flex flex-column justify-content-between">
                <h6>{m?.title}</h6>
                <p>{m?.description}</p>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleViewMaterial(m)}
                >
                  View File
                </Button>
                {selectedMaterial && modal && (
                  <Modal
                    setModal={setModal}
                    resume={`http://localhost:8080/uploads/materials/${selectedMaterial?.material}`}
                  />
                )}
              </Card>
            </>
          ))}
        </section>
      </Paper>
    </>
  );
};

export default ViewMaterials;
