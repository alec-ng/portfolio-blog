import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import ItemsCarousel from "react-items-carousel";
import styled from "styled-components";

export const DEFAULT_NUM_CARDS = 1;
export const VARIATION_DEFAULT = "carousel_default";

const NUM_CARDS_MOBILE = 1;

const CarouselImage = styled.div`
  height: ${props => props.height}px;
  background: url(${props => props.urlSource});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ChevronButton = styled.button`
  border-radius: 15px;
  border-style: groove;
  border-color: rgba(0, 0, 0, 0.75);
  color: black;
  border-width: 1px;
  background-color: white;
  transition: border-color 0.4s ease-in-out, color 0.75s ease-in-out;
  &:focus,
  &:active,
  &:hover {
    outline: none;
    border-color: rgb(255, 69, 0);
    color: rgb(255, 69, 0);
  }
`;

export function CarouselElement(props) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  // determine how many cards to show at once
  let numCards = isMobile
    ? NUM_CARDS_MOBILE
    : props.baseAttrs.numCards > 0
    ? props.baseAttrs.numCards
    : DEFAULT_NUM_CARDS;

  // Generate images from attribute
  let imgList = [];
  let urlSources = props.baseAttrs.urlSources
    ? props.baseAttrs.urlSources.split("\n")
    : "";
  if (urlSources && urlSources[0]) {
    let key = 0;
    urlSources.forEach(url => {
      if (url.length) {
        imgList.push(
          <CarouselImage
            key={key}
            urlSource={url}
            height={props.baseAttrs.height}
          />
        );
        key++;
      }
    });
  }

  function NoItemsMessage(props) {
    return (
      <div className="p-3">
        <h5 className="text-center text-muted">
          Provide at least one image to show
        </h5>
      </div>
    );
  }

  let sizeClassName = `scrapbookeditor-width_${props.baseAttrs.size}`;

  return (
    <>
      {imgList.length === 0 ? (
        <NoItemsMessage />
      ) : (
        <div className={sizeClassName} style={{ margin: "0 auto" }}>
          <ItemsCarousel
            infiniteLoop={false}
            gutter={12}
            activePosition={"center"}
            chevronWidth={60}
            disableSwipe={false}
            alwaysShowChevrons={false}
            numberOfCards={numCards}
            slidesToScroll={1}
            outsideChevron={false}
            showSlither={true}
            firstAndLastGutter={true}
            requestToChangeActive={setActiveItemIndex}
            activeItemIndex={activeItemIndex}
            leftChevron={<ChevronButton>{"<"}</ChevronButton>}
            rightChevron={<ChevronButton>{">"}</ChevronButton>}
          >
            {imgList}
          </ItemsCarousel>
        </div>
      )}
    </>
  );
}
