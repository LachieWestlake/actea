import * as React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
export interface Frontpage_2Props {}

export interface Frontpage_2State {}

class Frontpage_2 extends React.Component<Frontpage_2Props, Frontpage_2State> {
  render() {
    return (
      <section className="bg-white py-8">
        <div className="w-5/6 max-w-lg ml-auto mr-auto mt-8 mb-8">
          <div className="flex flex-col justify-center text-center pb-8">
            <h2 className="text-5xl font-semibold leading-none tracking-tight mb-4">
              Do You Have What It Takes?
            </h2>
            <h3 className="text-3xl text-blue-darker opacity-75 font-normal leading-none mb-8">
              Join Now. Explore Forever.
            </h3>
          </div>

          <div className="bg-white rounded shadow-lg overflow-hidden">
            <div className="flex flex-col-reverse md:flex-row">
              <div className="flex-1">
                <div className="bg-grey-lightest p-8 text-center">
                  <h5 className="text-xl font-semibold mb-8">
                    What you get when you sign up:
                  </h5>
                  <div className="p-3">Free Ideas</div>
                  <div className="p-3">Free Resources</div>
                  <div className="p-3">Free Connections</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/login">
          <button className="mx-auto block hover:bg-blue-lighter bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg">
            Get Started
          </button>
        </Link>
      </section>
    );
  }
}

export default Frontpage_2;
