import React from "react";
import { BiChevronRight } from "react-icons/bi";

const categories = ["Nuts & Seed", "Oils", "Fruits", "Tomatoes", "Soup"];
const images = ["bg-img1", "bg-img2", "bg-img3", "bg-img4", "bg-img5"];

const Category = () => {
  return (
    <section className="mb-10">
      <div className="containers">
        <div className="p-[30px] bg-white">
          <div className="flex items-center  border-b border-[#E2E2E2] py-[10px]">
            <div className="w-3 h-3 mr-2 border rounded-full border-[#B77FE2]" />
            <h2 className="text-[25px] text-primary font-semibold">
              Categorie
            </h2>
          </div>
          <div className="py-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`border-r ${img} bg-no-repeat bg-right-bottom last:border-r-0 pl-[20px] `}
              >
                <h2 className="text-[14px] mb-4 text-primary font-semibold">
                  Fruits & Vegetables
                </h2>
                <ul className="pb-[100px]">
                  {categories.map((items, idx) => (
                    <li
                      key={idx}
                      className="text-[13px] flex items-start cursor-pointer hover:text-secondary py-1"
                    >
                      <BiChevronRight className="text-secondary mr-1 text-[20px]" />
                      {items}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
