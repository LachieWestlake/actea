import * as React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

class Frontpage_1 extends React.Component {
  render() {
    let style: any = {};
    style.image = {
      backgroundImage:
        "url(https://images.unsplash.com/photo-1444080748397-f442aa95c3e5)",
      backgroundSize: "cover"
    };
    return (
      <div className="py-24 bg-cover shadow-md" style={style.image}>
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left text-white">
            <p className="uppercase tracking-loose w-full">
              What business are you?
            </p>
            <h1 className="my-4 text-5xl font-bold leading-tight">
              Social Media Service for Startup Founders!
            </h1>
            <p className="leading-normal text-2xl mb-8">
              Sub-hero message, not too long and not too short. Make it just
              right!
            </p>
            <Link to="/login">
              <button className="mx-auto lg:mx-0 hover:bg-blue-lighter bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Frontpage_1;
