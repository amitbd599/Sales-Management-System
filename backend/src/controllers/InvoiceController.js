const mongoose = require("mongoose");
const InvoiceModel = require("../models/InvoiceModel");

const ObjectId = mongoose.Types.ObjectId;
exports.create = async (req, res) => {
  try {
    let reqBody = req.body;
    let data = await InvoiceModel.create(reqBody);
    res.status(200).json({ status: "success", data: data });
  } catch (e) {
    res.status(200).json({ status: "error", error: e.toString() });
  }
};

exports.read_all = async (req, res) => {
  try {
    let projectionStage = {
      $project: {
        invoiceID: 1,
        customerName: 1,
        deliveryDate: 1,
        startDate: 1,
        due: 1,
        payment: 1,
      },
    };
    let data = await InvoiceModel.aggregate([projectionStage]);
    res.status(200).json({ status: "success", data: data });
  } catch (e) {
    res.status(200).json({ status: "error", error: e.toString() });
  }
};

exports.read_single = async (req, res) => {
  try {
    let invoice_id = new ObjectId(req.params.invoice_id);
    let MatchStage = {
      $match: {
        _id: invoice_id,
      },
    };
    let projectionStage = {
      $project: {
        _id: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };
    let data = await InvoiceModel.aggregate([MatchStage, projectionStage]);
    res.status(200).json({ status: "success", data: data[0] });
  } catch (e) {
    res.status(200).json({ status: "error", error: e.toString() });
  }
};

exports.update_single = async (req, res) => {
  try {
    let invoice_id = new ObjectId(req.params.invoice_id);
    let MatchStage = {
      _id: invoice_id,
    };
    let reqBody = req.body;
    let data = await InvoiceModel.updateOne(MatchStage, reqBody);
    res.status(200).json({ status: "success", data: data });
  } catch (e) {
    res.status(200).json({ status: "error", error: e.toString() });
  }
};

exports.delete_single = async (req, res) => {
  try {
    let invoice_id = new ObjectId(req.params.invoice_id);
    let MatchStage = {
      _id: invoice_id,
    };
    let data = await InvoiceModel.deleteOne(MatchStage);
    res.status(200).json({ status: "success", data: data });
  } catch (e) {
    res.status(200).json({ status: "error", error: e.toString() });
  }
};

exports.delete_all = async (req, res) => {
  try {
    let reqBody = req.body;
    reqBody = reqBody["_id"];

    const objectIdArray = reqBody.map((id) => new mongoose.Types.ObjectId(id));

    let data = await InvoiceModel.deleteMany({
      _id: { $in: objectIdArray },
    });

    res.status(200).json({ status: "success", data: data });
  } catch (e) {
    res.status(200).json({ status: "error", error: e.toString() });
  }
};
