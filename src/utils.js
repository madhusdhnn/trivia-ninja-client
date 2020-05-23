const Maps = {
   filter: (map, predicate) => {
      const result = new Map();
      for (const [k, v] of map) {
         if (predicate(k, v)) {
            result.set(k, v);
         }
      }
      return result;
   }
};

const Dimensions = {
   isSmallScreen: (width) => {
      return /xs|sm/.test(width);
   }
};

export {Maps, Dimensions};
