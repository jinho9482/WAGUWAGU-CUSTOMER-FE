import { serchApi } from "./serchNetwork";

export const createStore = async (data) => {
  console.log("createStore data: " + JSON.stringify(data, null, 2));
    const response = await serchApi("api/v2/elastic/", "post", data);
    return response.data;
};

export const deleteByCustomerId = async (id) => {
  console.log(`Deleting store with customer id: ${id}`);
  
  try {
    await serchApi(`api/v2/elastic/${id}`, "delete");
    return "삭제 성공";
  } catch (error) {
    console.error("Error deleting store:", error);
    throw error;
  }
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

    if (res.data && res.data.content) {
      return res.data.content;
    } else {
      throw new Error("Content not found in the response");
    }
  } catch (error) {
    console.error("Keyword search failed:", error);
    throw error;
  }
};

export const deleteStore = async (id) => {
    const response = await serchApi(`api/v2/elastic/${id}`, "delete");
    return response.data;
};
