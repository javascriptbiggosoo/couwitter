import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Ul = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export default function Navigation() {
  return (
    <nav>
      <Ul>
        <li>
          <Link to="/" style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            style={{
              marginLeft: 10,
            }}
          >
            <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
          </Link>
        </li>
      </Ul>
    </nav>
  );
}
