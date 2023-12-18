import hre from "hardhat";

// TODO: relay message
const main = async () => {
  const provider = hre.ethers.provider;

  await provider.getBlock("latest").then(console.log);
};

main()
  .then(() => {
    console.log("\t>Done");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
