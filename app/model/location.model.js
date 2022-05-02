module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      lattitude: String,
      logititude: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Location = mongoose.model("location", schema);
  return Location;
};
