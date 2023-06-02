import { ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import sanityClient, { urlFor } from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient.fetch(`*[_type == "category"]`).then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {/* CategoryCard */}
      {categories.map((cat) => (
        <CategoryCard
          key={cat._id}
          imgUrl={urlFor(cat.image).width(200).url()}
          title={cat.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
