import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import LevelBlockItem from "./LevelBlockItem";
import ModalForBigLevel from "./ModalForBigLevel";

const LevelBlock = ({ id, title, prevId, userData }) => {
  const [showModal, setShowModal] = useState(false);

  const expectedLevelUserData = useMemo(
    () => userData.find((item) => item.id === id),
    [userData, id]
  );

  const prevLevelUserData = useMemo(
    () => userData.find((item) => item.id === prevId),
    [userData, prevId]
  );

  const onClosedLevelClick = () => {
    setShowModal(true);
  };

  const onClickCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <>
        {(prevLevelUserData && prevLevelUserData.accurancy > 90) ||
        id === "1" ? (
          <Link to={`game/${id}`}>
            <LevelBlockItem
              title={title}
              expectedLevelUserData={expectedLevelUserData}
              isOpen
            />
          </Link>
        ) : (
          <LevelBlockItem
            title={title}
            onClick={onClosedLevelClick}
            expectedLevelUserData={expectedLevelUserData}
          />
        )}
      </>
      {showModal ? (
        <ModalForBigLevel onClickCloseModal={onClickCloseModal} />
      ) : null}
    </>
  );
};

export default LevelBlock;
