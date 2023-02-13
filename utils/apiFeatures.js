class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    const queryStringObj = { ...this.queryString };
    const encludesFields = ["page", "sort", "limit", "fields"];
    encludesFields.forEach((field) => delete queryStringObj[field]);

    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      //execlude field
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  search() {
    if (this.queryString.keyword) {
      const query = {};
      query.$or = [
        //node =NODE
        { title: { $regex: this.queryString.keyword, $options: "i" } },
        { description: { $regex: this.queryString.keyword, $options: "i" } },
      ];
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }

  pagenation(countDocs) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    //pagenation result
    const pagenation = {};
    pagenation.currentPage = page;
    pagenation.limit = limit;
    pagenation.numberOfPages = countDocs / limit;

    //next page
    if (endIndex < countDocs) {
      pagenation.next = page + 1;
    }
    //prev page
    if (skip > 0) {
      pagenation.prev = page + 1;
    }

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.pagenationResult = pagenation;


    return this;
  }
}
module.exports = ApiFeatures;
