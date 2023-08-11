const fs = require('fs')

const dpack   = require('@etherpacks/dpack')
const timelock = require('@openzeppelin/contracts/build/contracts/TimelockController.json')

async function build(network) {
  const builder = new dpack.PackBuilder(network)
  const json = JSON.stringify

  const Timelock_artifact = { abi: timelock.abi, bytecode: timelock.bytecode }
  await builder.packType({
    typename: 'TimelockController',
    artifact: Timelock_artifact
  })
  const pack = await builder.build();
  fs.writeFileSync(`./pack/openzeppelin-contracts_${network}.dpack.json`, JSON.stringify(pack, null, 2));
}

build('arbitrum')
