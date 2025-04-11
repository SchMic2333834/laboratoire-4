"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import Link from "next/link";

export default function Header() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <nav className="navbar navbar-expand-md navbar-dark py-0 d-flex">
      <div className="py-0 d-flex flex-grow-1 flex-md-grow-0">
        <Link className="navbar-brand d-flex align-items-center justify-content-center w-100" href="/">
          <img className="img-fluid" src="/logo.png" alt="uwu" />
        </Link>
        <div className="d-flex flex-grow-1 flex-md-grow-0">
          <button
            className="navbar-toggler w-100 rounded-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
      <div className="collapse navbar-collapse ml-5" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto d-flex justify-content-evenly align-items-center w-100 h-100">
          <li className="nav-item active w-100 h-100">
            <Link className="nav-link h-100 d-flex align-items-center justify-content-center" href="/blog/new">Menu1</Link>
          </li>
          <li className="nav-item w-100 h-100">
            <Link className="nav-link h-100 d-flex align-items-center justify-content-center" href="#">Menu2</Link>
          </li>
          <li className="nav-item w-100 h-100">
            <Link className="nav-link h-100 d-flex align-items-center justify-content-center" href="#">Menu3</Link>
          </li>
          <li className="nav-item w-100 h-100">
            <Link className="nav-link h-100 d-flex align-items-center justify-content-center" href="#">Menu4</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
