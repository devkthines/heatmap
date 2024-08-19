// components/Locations.js
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@mui/material/Button";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  MapControl,
  ControlPosition,
} from "@vis.gl/react-google-maps";
import { IoMapSharp } from "react-icons/io5";
import { IoArrowBackCircle } from "react-icons/io5";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { IoMdPin } from "react-icons/io";

const LegendMarkerIcon = ({ color, borderColor, glyphColor }) => (
  <div
    style={{
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      backgroundColor: color,
      borderColor,
      borderWidth: "2px",
      borderStyle: "solid",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <span
      style={{
        fontSize: "12px",
        color: glyphColor,
        fontWeight: "bold",
      }}
    >
      &#x2691;
    </span>
  </div>
);

export default function Locations({ stores }) {
  const position = { lat: 38.134085088146975, lng: -121.27368109703556 };
  const [markers, setMarkers] = useState(stores);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [menuStack, setMenuStack] = useState(["main"]);
  const [infowindowShown, setInfowindowShown] = useState(false);
  const [displayedMarker, setDisplayedMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    setMenuStack(["main", "details"]);
    setSelectedMarker(marker);
    setDisplayedMarker(marker);
    setInfowindowShown(true);
  };

  const renderInfoWindow = () => (
    <InfoWindow
      position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
      onCloseClick={handleBackButtonClick}
      maxWidth={200}
    >
      <h6>{selectedMarker.branch + " #" + selectedMarker.storeNumber}</h6>
      <p>{selectedMarker.address}</p>
      <div className="flex">
        <IoMapSharp />
        <p className="mx-2">
          <a target="_blank" href={selectedMarker.googleMapsLink}>
            Get Directions
          </a>
        </p>
      </div>
    </InfoWindow>
  );

  const handleBackButtonClick = () => {
    setInfowindowShown(false);
    setMenuStack((prevStack) => {
      const newStack = [...prevStack];
      newStack.pop();
      if (newStack.length === 1) {
        setSelectedMarker(null);
      }
      return newStack;
    });
  };

  const currentMenu = menuStack[menuStack.length - 1];

  return (
    <Grid container>
      <Grid xs={12}>
        <div id="locations">
          <div id="testingContainer">
            {currentMenu === "main" && (
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <div id="listed" className="">
                  <div id="menuBanner">
                    <h5>Select a Store Below</h5>
                  </div>
                  {markers.map((marker) => 
                    <div
                      className="storeBoxes"
                      key={marker.id}
                      onClick={() => handleMarkerClick(marker)}
                    >
                      <h6>{marker.branch + " - "}</h6>
                      <h6>
                        {marker.city +
                          (marker.branch !== "PAQ, INC" && marker.branch !== "China Express"
                            ? " #" + marker.storeNumber
                            : "")}
                      </h6>
                      <p>{marker.address}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            <AnimatePresence>
              {currentMenu === "details" && displayedMarker && (
                <motion.div
                  key={displayedMarker.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <div id="detailsBanner" className="back-button-container">
                      <button
                        onClick={handleBackButtonClick}
                        className="text-center"
                      >
                        <IoArrowBackCircle className="backBtnDetails" />
                        <h6 className="back-button-label">
                          Back to store listings
                        </h6>
                      </button>
                    </div>
                    <div className="detailsHead">
                      <h6>
                        {selectedMarker.branch +
                          " - " +
                          selectedMarker.city +
                          (selectedMarker.branch !== "PAQ, INC" && selectedMarker.branch !== "China Express"
                            ? " #" + selectedMarker.storeNumber
                            : "")}
                      </h6>
                      <p>{selectedMarker.address}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div id="mapCont" className="map-container">
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
              <Map
                zoom={7}
                center={position}
                mapId={process.env.NEXT_PUBLIC_MAP_ID}
                streetViewControl={false}
                mapTypeControl={false}
                fullscreenControlOptions={{
                  position: ControlPosition.BOTTOM_RIGHT,
                }}
              >
                <MapControl position={ControlPosition.TOP_LEFT}>
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      margin: "5px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "10px 0",
                      }}
                    >
                      <LegendMarkerIcon
                        color="black"
                        borderColor="#c36"
                        glyphColor="#c36"
                      />
                      <span style={{ marginLeft: "5px" }}>PAQ, INC.</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "10px 0",
                      }}
                    >
                      <LegendMarkerIcon
                        color="black"
                        borderColor="black"
                        glyphColor="#fffd00"
                      />
                      <span style={{ marginLeft: "5px" }}>Food 4 Less</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "10px 0",
                      }}
                    >
                      <LegendMarkerIcon
                        color="#00A887"
                        borderColor="#c36"
                        glyphColor="#c36"
                      />
                      <span style={{ marginLeft: "5px" }}>
                        Rancho San Miguel
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "10px 0",
                      }}
                    >
                      <LegendMarkerIcon
                        color="orange"
                        borderColor="black"
                        glyphColor="black"
                      />
                      <span style={{ marginLeft: "5px" }}>China Express</span>
                    </div>
                  </div>
                </MapControl>
                {markers.map((marker) => (
                  <AdvancedMarker
                    key={marker.id}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => handleMarkerClick(marker)}
                  >
                    {marker.branch === "Food 4 Less" ? (
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        <Pin
                          background={"black"}
                          borderColor={"black"}
                          glyphColor={"#fffd00"}
                        />
                      </motion.div>
                    ) : marker.branch === "Rancho San Miguel" ? (
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        {" "}
                        <Pin
                          background={"#00A887"}
                          borderColor={"#c36"}
                          glyphColor={"#c36"}
                        />
                      </motion.div>
                    ) : marker.branch === "China Express" ? (
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        <Pin
                          background={"orange"}
                          borderColor={"black"}
                          glyphColor={"black"}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        <Pin
                          background={"black"}
                          borderColor={"#c36"}
                          glyphColor={"#c36"}
                        />
                      </motion.div>
                    )}
                  </AdvancedMarker>
                ))}
              </Map>
            </APIProvider>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
