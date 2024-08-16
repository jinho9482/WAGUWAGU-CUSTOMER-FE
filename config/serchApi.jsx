import { serchApi } from "./serchNetwork";

export const createStore = async (data) => {
    const response = await serchApi("api/v2/elastic", "post", data);
    return response.data;
};

export const analyzeEntity = async (data) => {
    const response = await serchApi("api/v2/elastic/analyzeEntity", "post", data);
    return response.data;
};

export const searchStore = async (storeName, pageable) => {
    const response = await serchApi("api/v2/elastic/search/store", "get", null, {
     
            storeName,
            ...pageable

    });
    return response.data;
};

export const searchMenu = async (menuName, pageable) => {
    const response = await serchApi("api/v2/elastic/search/menu", "get", null, {
        
            menuName,
            ...pageable
    
    });
    return response.data;
};

export const searchByKeyword = async (keyword, pageable) => {
  try {
    const res = await serchApi("api/v2/elastic/", "get", null, {
      keyword,
      ...pageable,
    });

    // Return only the content array from the response
    return res.data.content;
  } catch (error) {
    console.error("Keyword search failed:", error);
    throw error;
  }
};

export const deleteStore = async (id) => {
    const response = await serchApi(`api/v2/elastic/${id}`, "delete");
    return response.data;
};
