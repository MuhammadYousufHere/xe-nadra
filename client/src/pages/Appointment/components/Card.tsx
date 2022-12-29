import React, { FC } from "react";
import { CardProps } from "./types.d";
import "./styles.scss";
const Card: FC<CardProps> = ({ children }) => {
  return <main className="appointment-card">{children}</main>;
};

export default Card;
