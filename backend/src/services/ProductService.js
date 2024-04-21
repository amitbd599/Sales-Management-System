const mongoose = require("mongoose");
const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const ProductSliderModel = require("../models/ProductSliderModel");
const ProductModel = require("../models/ProductModel");
const ProductDetailsModel = require("../models/ProductDetailsModel");
const ReviewModel = require("../models/ReviewModel");

const ObjectId = mongoose.Types.ObjectId;

const BrandListService = async () => {
  try {
    const data = await BrandModel.find();
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
const CategoryListService = async () => {
  try {
    const data = await CategoryModel.find();
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
const SliderListService = async () => {
  try {
    const data = await SliderList.find();
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
const ListByBrandService = async (req) => {
  try {
    let BrandID = new ObjectId(req.params.BrandID);
    let MatchStage = { $match: { brandID: BrandID } };
    let JoinWithBrand = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategory = {
      $lookup: {
        from: "catagories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrand,
      JoinWithCategory,
      UnwindBrandStage,
      UnwindCategoryStage,
      projectionStage,
    ]);
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
const ListByCategoryService = async (req) => {
  try {
    let CategoryID = new ObjectId(req.params.CategoryID);
    let MatchStage = { $match: { categoryID: CategoryID } };
    let JoinWithBrand = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategory = {
      $lookup: {
        from: "catagories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrand,
      JoinWithCategory,
      UnwindBrandStage,
      UnwindCategoryStage,
      projectionStage,
    ]);
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

const ListByRemarkService = async (req) => {
  try {
    let Remark = req.params.Remark;
    let MatchStage = { $match: { remark: Remark } };
    let JoinWithBrand = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategory = {
      $lookup: {
        from: "catagories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrand,
      JoinWithCategory,
      UnwindBrandStage,
      UnwindCategoryStage,
      projectionStage,
    ]);
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
const ListBySmilerService = async (req) => {
  try {
    let CategoryID = new ObjectId(req.params.CategoryID);
    let MatchStage = { $match: { categoryID: CategoryID } };
    let limit = { $limit: 20 };
    let JoinWithBrand = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategory = {
      $lookup: {
        from: "catagories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      limit,
      JoinWithBrand,
      JoinWithCategory,
      UnwindBrandStage,
      UnwindCategoryStage,
      projectionStage,
    ]);
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
const ListByKeywordService = async (req) => {
  try {
    let searchRegex = { $regex: req.params.Keyword, $options: "i" };
    let searchParams = [{ title: searchRegex }, { shortDes: searchRegex }];
    let searchQuery = { $or: searchParams };
    let MatchStage = { $match: searchQuery };

    let JoinWithBrand = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategory = {
      $lookup: {
        from: "catagories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrand,
      JoinWithCategory,
      UnwindBrandStage,
      UnwindCategoryStage,
      projectionStage,
    ]);
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

const ProductDetailsService = async (req) => {
  try {
    let ProductID = new ObjectId(req.params.ProductID);
    let MatchStage = { $match: { _id: ProductID } };

    let JoinWithBrand = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategory = {
      $lookup: {
        from: "catagories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinWithProductDetail = {
      $lookup: {
        from: "productsdetails",
        localField: "_id",
        foreignField: "productID",
        as: "details",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let UnwindProductDetailStage = { $unwind: "$details" };

    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrand,
      JoinWithCategory,
      JoinWithProductDetail,
      UnwindBrandStage,
      UnwindCategoryStage,
      UnwindProductDetailStage,
      projectionStage,
    ]);
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};
const ReviewListService = async (req) => {
  try {
    let ProductID = new ObjectId(req.params.ProductID);
    let MatchStage = { $match: { productID: ProductID } };
    let JoinWithProfile = {
      $lookup: {
        from: "profiles",
        localField: "userID",
        foreignField: "userID",
        as: "profile",
      },
    };

    let UnwindProfileStage = {
      $unwind: "$profile",
    };
    let projectionStage = {
      $project: {
        des: 1,
        rating: 1,
        "profile.cus_name": 1,
      },
    };

    let data = await ReviewModel.aggregate([
      MatchStage,
      JoinWithProfile,
      UnwindProfileStage,
      projectionStage,
    ]);
    return { status: true, data: data };
  } catch (error) {
    return { status: false, error: error.toString() };
  }
};

module.exports = {
  BrandListService,
  CategoryListService,
  SliderListService,
  ListByBrandService,
  ListByCategoryService,
  ListBySmilerService,
  ListByKeywordService,
  ListByRemarkService,
  ProductDetailsService,
  ReviewListService,
};
