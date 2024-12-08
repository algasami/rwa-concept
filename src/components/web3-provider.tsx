"use client";

import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet, sepolia } from "viem/chains";
import {
  useAccount,
  useDeployContract,
  useReadContract,
  WagmiProvider,
} from "wagmi";

import TicketToolAbi from "@/config/ticket-tool-abi.json";
import { useState } from "react";
import { readContract } from "viem/actions";

const config = getDefaultConfig({
  appName: "Ticket Tool",
  projectId: "72d752cf09481fbd1402163ac70cee7d",
  chains: [mainnet, sepolia],
  ssr: true,
});
const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#CC11CC",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export const SellerContractPage = () => {
  const [contract, setContract] = useState<`0x${string}` | undefined>(
    undefined
  );
  const { deployContract } = useDeployContract();
  const { address, chainId } = useAccount();

  if (address === undefined || chainId === undefined) {
    return undefined;
  }

  return (
    <span>
      {contract === undefined && (
        <button
          onClick={async () => {
            deployContract(
              {
                abi: TicketToolAbi,
                bytecode,
                args: [10, "Bobs Diner", "BOBS"],
              },
              {
                onError: () => {},
                onSettled: (contract) => {
                  setContract(contract);
                },
              }
            );
          }}
          className="btn btn-primary button"
        >
          Create Ticket Contract
        </button>
      )}
      {contract !== undefined && (
        <>
          <p>Contract deployed at {contract}</p>
          <button
            className="button"
            onClick={() => {
              const result = readContract(config.getClient(), {
                address: contract,
                abi: TicketToolAbi,
                functionName: "fee",
                args: [],
                account: address,
              })
                .then((x) => console.log(x))
                .catch(console.error);
            }}
          >
            View Contract's Fee
          </button>
        </>
      )}
      <p>Have a contract? Type it here</p>
      <input
        type="text"
        onChange={(e) => {
          const sth = e.target.value.trim();
          if (sth.length === 0) {
            setContract(undefined);
            return;
          }
          if (!sth.startsWith("0x")) {
            return;
          }
          setContract(sth as `0x${string}`);
        }}
        className="input bg-transparent"
      />
    </span>
  );
};

const bytecode =
  "0x608060405234801561000f575f80fd5b5060405161332f38038061332f8339818101604052810190610031919061032e565b338282815f908161004291906105ba565b50806001908161005291906105ba565b5050505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036100c5575f6040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016100bc91906106c8565b60405180910390fd5b6100d4816100eb60201b60201c565b50826009819055505f600a819055505050506106e1565b5f60065f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508160065f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f604051905090565b5f80fd5b5f80fd5b5f819050919050565b6101d1816101bf565b81146101db575f80fd5b50565b5f815190506101ec816101c8565b92915050565b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b610240826101fa565b810181811067ffffffffffffffff8211171561025f5761025e61020a565b5b80604052505050565b5f6102716101ae565b905061027d8282610237565b919050565b5f67ffffffffffffffff82111561029c5761029b61020a565b5b6102a5826101fa565b9050602081019050919050565b8281835e5f83830152505050565b5f6102d26102cd84610282565b610268565b9050828152602081018484840111156102ee576102ed6101f6565b5b6102f98482856102b2565b509392505050565b5f82601f830112610315576103146101f2565b5b81516103258482602086016102c0565b91505092915050565b5f805f60608486031215610345576103446101b7565b5b5f610352868287016101de565b935050602084015167ffffffffffffffff811115610373576103726101bb565b5b61037f86828701610301565b925050604084015167ffffffffffffffff8111156103a05761039f6101bb565b5b6103ac86828701610301565b9150509250925092565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061040457607f821691505b602082108103610417576104166103c0565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026104797fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261043e565b610483868361043e565b95508019841693508086168417925050509392505050565b5f819050919050565b5f6104be6104b96104b4846101bf565b61049b565b6101bf565b9050919050565b5f819050919050565b6104d7836104a4565b6104eb6104e3826104c5565b84845461044a565b825550505050565b5f90565b6104ff6104f3565b61050a8184846104ce565b505050565b5b8181101561052d576105225f826104f7565b600181019050610510565b5050565b601f821115610572576105438161041d565b61054c8461042f565b8101602085101561055b578190505b61056f6105678561042f565b83018261050f565b50505b505050565b5f82821c905092915050565b5f6105925f1984600802610577565b1980831691505092915050565b5f6105aa8383610583565b9150826002028217905092915050565b6105c3826103b6565b67ffffffffffffffff8111156105dc576105db61020a565b5b6105e682546103ed565b6105f1828285610531565b5f60209050601f831160018114610622575f8415610610578287015190505b61061a858261059f565b865550610681565b601f1984166106308661041d565b5f5b8281101561065757848901518255600182019150602085019450602081019050610632565b868310156106745784890151610670601f891682610583565b8355505b6001600288020188555050505b505050505050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6106b282610689565b9050919050565b6106c2816106a8565b82525050565b5f6020820190506106db5f8301846106b9565b92915050565b612c41806106ee5f395ff3fe608060405260043610610180575f3560e01c8063715018a6116100d0578063c87b56dd11610089578063ddca3f4311610063578063ddca3f43146105a6578063e985e9c5146105d0578063ea5140c31461060c578063f2fde38b1461063457610180565b8063c87b56dd14610506578063d098769b14610542578063d5c143911461056a57610180565b8063715018a61461041057806375223070146104265780638da5cb5b1461046257806395d89b411461048c578063a22cb465146104b6578063b88d4fde146104de57610180565b806342842e0e1161013d57806361bc221a1161011757806361bc221a146103465780636352211e146103705780636a1db1bf146103ac57806370a08231146103d457610180565b806342842e0e146102a657806347c1ce12146102ce5780635f7262791461030a57610180565b806301ffc9a71461018457806306fdde03146101c0578063081812fc146101ea578063095ea7b3146102265780631116fd041461024e57806323b872dd1461027e575b5f80fd5b34801561018f575f80fd5b506101aa60048036038101906101a59190612143565b61065c565b6040516101b79190612188565b60405180910390f35b3480156101cb575f80fd5b506101d461073d565b6040516101e19190612211565b60405180910390f35b3480156101f5575f80fd5b50610210600480360381019061020b9190612264565b6107cc565b60405161021d91906122ce565b60405180910390f35b348015610231575f80fd5b5061024c60048036038101906102479190612311565b6107e7565b005b61026860048036038101906102639190612264565b6107fd565b604051610275919061235e565b60405180910390f35b348015610289575f80fd5b506102a4600480360381019061029f9190612377565b61097d565b005b3480156102b1575f80fd5b506102cc60048036038101906102c79190612377565b610a7c565b005b3480156102d9575f80fd5b506102f460048036038101906102ef9190612264565b610a9b565b6040516103019190612188565b60405180910390f35b348015610315575f80fd5b50610330600480360381019061032b9190612264565b610b2f565b60405161033d919061235e565b60405180910390f35b348015610351575f80fd5b5061035a610bc2565b604051610367919061235e565b60405180910390f35b34801561037b575f80fd5b5061039660048036038101906103919190612264565b610bc8565b6040516103a391906122ce565b60405180910390f35b3480156103b7575f80fd5b506103d260048036038101906103cd9190612264565b610bd9565b005b3480156103df575f80fd5b506103fa60048036038101906103f591906123c7565b610beb565b604051610407919061235e565b60405180910390f35b34801561041b575f80fd5b50610424610ca1565b005b348015610431575f80fd5b5061044c60048036038101906104479190612264565b610cb4565b604051610459919061235e565b60405180910390f35b34801561046d575f80fd5b50610476610d46565b60405161048391906122ce565b60405180910390f35b348015610497575f80fd5b506104a0610d6e565b6040516104ad9190612211565b60405180910390f35b3480156104c1575f80fd5b506104dc60048036038101906104d7919061241c565b610dfe565b005b3480156104e9575f80fd5b5061050460048036038101906104ff9190612586565b610e14565b005b348015610511575f80fd5b5061052c60048036038101906105279190612264565b610e39565b6040516105399190612211565b60405180910390f35b34801561054d575f80fd5b5061056860048036038101906105639190612264565b610e9f565b005b348015610575575f80fd5b50610590600480360381019061058b9190612264565b611000565b60405161059d919061235e565b60405180910390f35b3480156105b1575f80fd5b506105ba61102b565b6040516105c7919061235e565b60405180910390f35b3480156105db575f80fd5b506105f660048036038101906105f19190612606565b611031565b6040516106039190612188565b60405180910390f35b348015610617575f80fd5b50610632600480360381019061062d9190612644565b6110bf565b005b34801561063f575f80fd5b5061065a600480360381019061065591906123c7565b611123565b005b5f7f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061072657507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806107365750610735826111a7565b5b9050919050565b60605f805461074b906126af565b80601f0160208091040260200160405190810160405280929190818152602001828054610777906126af565b80156107c25780601f10610799576101008083540402835291602001916107c2565b820191905f5260205f20905b8154815290600101906020018083116107a557829003601f168201915b5050505050905090565b5f6107d682611210565b506107e082611296565b9050919050565b6107f982826107f46112cf565b6112d6565b5050565b5f6009543414610842576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161083990612729565b60405180910390fd5b428211610884576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087b90612791565b60405180910390fd5b5f60075f8481526020019081526020015f2054116108d7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108ce906127f9565b60405180910390fd5b600160075f8481526020019081526020015f205f8282546108f89190612844565b925050819055508160085f600a5481526020019081526020015f205f018190555060095460085f600a5481526020019081526020015f20600101819055506001600a5f8282546109489190612877565b92505081905550610967336001600a546109629190612844565b6112e8565b6001600a546109769190612844565b9050919050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036109ed575f6040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016109e491906122ce565b60405180910390fd5b5f610a0083836109fb6112cf565b611305565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610a76578382826040517f64283d7b000000000000000000000000000000000000000000000000000000008152600401610a6d939291906128aa565b60405180910390fd5b50505050565b610a9683838360405180602001604052805f815250610e14565b505050565b5f8073ffffffffffffffffffffffffffffffffffffffff16610abc836113b1565b73ffffffffffffffffffffffffffffffffffffffff1603610b12576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b0990612929565b60405180910390fd5b4260085f8481526020019081526020015f205f0154109050919050565b5f8073ffffffffffffffffffffffffffffffffffffffff16610b5083610bc8565b73ffffffffffffffffffffffffffffffffffffffff1603610ba6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b9d90612929565b60405180910390fd5b60085f8381526020019081526020015f20600101549050919050565b600a5481565b5f610bd282611210565b9050919050565b610be16113ea565b8060098190555050565b5f8073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610c5c575f6040517f89c62b64000000000000000000000000000000000000000000000000000000008152600401610c5391906122ce565b60405180910390fd5b60035f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050919050565b610ca96113ea565b610cb25f611471565b565b5f8073ffffffffffffffffffffffffffffffffffffffff16610cd583610bc8565b73ffffffffffffffffffffffffffffffffffffffff1603610d2b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d2290612929565b60405180910390fd5b60085f8381526020019081526020015f205f01549050919050565b5f60065f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060018054610d7d906126af565b80601f0160208091040260200160405190810160405280929190818152602001828054610da9906126af565b8015610df45780601f10610dcb57610100808354040283529160200191610df4565b820191905f5260205f20905b815481529060010190602001808311610dd757829003601f168201915b5050505050905090565b610e10610e096112cf565b8383611534565b5050565b610e1f84848461097d565b610e33610e2a6112cf565b8585858561169d565b50505050565b6060610e4482611210565b505f610e4e611849565b90505f815111610e6c5760405180602001604052805f815250610e97565b80610e768461185f565b604051602001610e87929190612981565b6040516020818303038152906040525b915050919050565b5f73ffffffffffffffffffffffffffffffffffffffff16610ebf826113b1565b73ffffffffffffffffffffffffffffffffffffffff1603610f15576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f0c906129ee565b60405180910390fd5b610f1e81610a9b565b610f5d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f5490612a56565b60405180910390fd5b5f610f695f835f611929565b90505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610fdb57816040517f7e273289000000000000000000000000000000000000000000000000000000008152600401610fd2919061235e565b60405180910390fd5b60085f8381526020019081526020015f205f8082015f9055600182015f905550505050565b5f42821015611011575f9050611026565b60075f8381526020019081526020015f205490505b919050565b60095481565b5f60055f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff16905092915050565b6110c76113ea565b428211611109576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161110090612791565b60405180910390fd5b8060075f8481526020019081526020015f20819055505050565b61112b6113ea565b5f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361119b575f6040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161119291906122ce565b60405180910390fd5b6111a481611471565b50565b5f7f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b5f8061121b836113b1565b90505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361128d57826040517f7e273289000000000000000000000000000000000000000000000000000000008152600401611284919061235e565b60405180910390fd5b80915050919050565b5f60045f8381526020019081526020015f205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b5f33905090565b6112e38383836001611b34565b505050565b611301828260405180602001604052805f815250611cf3565b5050565b5f8073ffffffffffffffffffffffffffffffffffffffff16611326846113b1565b73ffffffffffffffffffffffffffffffffffffffff16036113535761134c848484611929565b90506113aa565b61135c83610a9b565b1561139c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161139390612abe565b60405180910390fd5b6113a7848484611929565b90505b9392505050565b5f60025f8381526020019081526020015f205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6113f26112cf565b73ffffffffffffffffffffffffffffffffffffffff16611410610d46565b73ffffffffffffffffffffffffffffffffffffffff161461146f576114336112cf565b6040517f118cdaa700000000000000000000000000000000000000000000000000000000815260040161146691906122ce565b60405180910390fd5b565b5f60065f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508160065f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036115a457816040517f5b08ba1800000000000000000000000000000000000000000000000000000000815260040161159b91906122ce565b60405180910390fd5b8060055f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f6101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516116909190612188565b60405180910390a3505050565b5f8373ffffffffffffffffffffffffffffffffffffffff163b1115611842578273ffffffffffffffffffffffffffffffffffffffff1663150b7a02868685856040518563ffffffff1660e01b81526004016116fb9493929190612b2e565b6020604051808303815f875af192505050801561173657506040513d601f19601f820116820180604052508101906117339190612b8c565b60015b6117b7573d805f8114611764576040519150601f19603f3d011682016040523d82523d5f602084013e611769565b606091505b505f8151036117af57836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016117a691906122ce565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461184057836040517f64a0ae9200000000000000000000000000000000000000000000000000000000815260040161183791906122ce565b60405180910390fd5b505b5050505050565b606060405180602001604052805f815250905090565b60605f600161186d84611d16565b0190505f8167ffffffffffffffff81111561188b5761188a612462565b5b6040519080825280601f01601f1916602001820160405280156118bd5781602001600182028036833780820191505090505b5090505f82602001820190505b60011561191e578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a858161191357611912612bb7565b5b0494505f85036118ca575b819350505050919050565b5f80611934846113b1565b90505f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161461197557611974818486611e67565b5b5f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611a00576119b45f855f80611b34565b600160035f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825403925050819055505b5f73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614611a7f57600160035f8773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8460025f8681526020019081526020015f205f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4809150509392505050565b8080611b6c57505f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b15611c9e575f611b7b84611210565b90505f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614158015611be557508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b8015611bf85750611bf68184611031565b155b15611c3a57826040517fa9fbf51f000000000000000000000000000000000000000000000000000000008152600401611c3191906122ce565b60405180910390fd5b8115611c9c57838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b8360045f8581526020019081526020015f205f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b611cfd8383611f2a565b611d11611d086112cf565b5f85858561169d565b505050565b5f805f90507a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611d72577a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008381611d6857611d67612bb7565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310611daf576d04ee2d6d415b85acef81000000008381611da557611da4612bb7565b5b0492506020810190505b662386f26fc100008310611dde57662386f26fc100008381611dd457611dd3612bb7565b5b0492506010810190505b6305f5e1008310611e07576305f5e1008381611dfd57611dfc612bb7565b5b0492506008810190505b6127108310611e2c576127108381611e2257611e21612bb7565b5b0492506004810190505b60648310611e4f5760648381611e4557611e44612bb7565b5b0492506002810190505b600a8310611e5e576001810190505b80915050919050565b611e7283838361201d565b611f25575f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603611ee657806040517f7e273289000000000000000000000000000000000000000000000000000000008152600401611edd919061235e565b60405180910390fd5b81816040517f177e802f000000000000000000000000000000000000000000000000000000008152600401611f1c929190612be4565b60405180910390fd5b505050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611f9a575f6040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600401611f9191906122ce565b60405180910390fd5b5f611fa683835f611305565b90505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614612018575f6040517f73c6ac6e00000000000000000000000000000000000000000000000000000000815260040161200f91906122ce565b60405180910390fd5b505050565b5f8073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141580156120d457508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061209557506120948484611031565b5b806120d357508273ffffffffffffffffffffffffffffffffffffffff166120bb83611296565b73ffffffffffffffffffffffffffffffffffffffff16145b5b90509392505050565b5f604051905090565b5f80fd5b5f80fd5b5f7fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b612122816120ee565b811461212c575f80fd5b50565b5f8135905061213d81612119565b92915050565b5f60208284031215612158576121576120e6565b5b5f6121658482850161212f565b91505092915050565b5f8115159050919050565b6121828161216e565b82525050565b5f60208201905061219b5f830184612179565b92915050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f6121e3826121a1565b6121ed81856121ab565b93506121fd8185602086016121bb565b612206816121c9565b840191505092915050565b5f6020820190508181035f83015261222981846121d9565b905092915050565b5f819050919050565b61224381612231565b811461224d575f80fd5b50565b5f8135905061225e8161223a565b92915050565b5f60208284031215612279576122786120e6565b5b5f61228684828501612250565b91505092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6122b88261228f565b9050919050565b6122c8816122ae565b82525050565b5f6020820190506122e15f8301846122bf565b92915050565b6122f0816122ae565b81146122fa575f80fd5b50565b5f8135905061230b816122e7565b92915050565b5f8060408385031215612327576123266120e6565b5b5f612334858286016122fd565b925050602061234585828601612250565b9150509250929050565b61235881612231565b82525050565b5f6020820190506123715f83018461234f565b92915050565b5f805f6060848603121561238e5761238d6120e6565b5b5f61239b868287016122fd565b93505060206123ac868287016122fd565b92505060406123bd86828701612250565b9150509250925092565b5f602082840312156123dc576123db6120e6565b5b5f6123e9848285016122fd565b91505092915050565b6123fb8161216e565b8114612405575f80fd5b50565b5f81359050612416816123f2565b92915050565b5f8060408385031215612432576124316120e6565b5b5f61243f858286016122fd565b925050602061245085828601612408565b9150509250929050565b5f80fd5b5f80fd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b612498826121c9565b810181811067ffffffffffffffff821117156124b7576124b6612462565b5b80604052505050565b5f6124c96120dd565b90506124d5828261248f565b919050565b5f67ffffffffffffffff8211156124f4576124f3612462565b5b6124fd826121c9565b9050602081019050919050565b828183375f83830152505050565b5f61252a612525846124da565b6124c0565b9050828152602081018484840111156125465761254561245e565b5b61255184828561250a565b509392505050565b5f82601f83011261256d5761256c61245a565b5b813561257d848260208601612518565b91505092915050565b5f805f806080858703121561259e5761259d6120e6565b5b5f6125ab878288016122fd565b94505060206125bc878288016122fd565b93505060406125cd87828801612250565b925050606085013567ffffffffffffffff8111156125ee576125ed6120ea565b5b6125fa87828801612559565b91505092959194509250565b5f806040838503121561261c5761261b6120e6565b5b5f612629858286016122fd565b925050602061263a858286016122fd565b9150509250929050565b5f806040838503121561265a576126596120e6565b5b5f61266785828601612250565b925050602061267885828601612250565b9150509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806126c657607f821691505b6020821081036126d9576126d8612682565b5b50919050565b7f496e76616c6964206665650000000000000000000000000000000000000000005f82015250565b5f612713600b836121ab565b915061271e826126df565b602082019050919050565b5f6020820190508181035f83015261274081612707565b9050919050565b7f496e76616c69642074696d6500000000000000000000000000000000000000005f82015250565b5f61277b600c836121ab565b915061278682612747565b602082019050919050565b5f6020820190508181035f8301526127a88161276f565b9050919050565b7f4e6f207469636b65747320617661696c61626c650000000000000000000000005f82015250565b5f6127e36014836121ab565b91506127ee826127af565b602082019050919050565b5f6020820190508181035f830152612810816127d7565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61284e82612231565b915061285983612231565b925082820390508181111561287157612870612817565b5b92915050565b5f61288182612231565b915061288c83612231565b92508282019050808211156128a4576128a3612817565b5b92915050565b5f6060820190506128bd5f8301866122bf565b6128ca602083018561234f565b6128d760408301846122bf565b949350505050565b7f496e76616c696420746f6b656e000000000000000000000000000000000000005f82015250565b5f612913600d836121ab565b915061291e826128df565b602082019050919050565b5f6020820190508181035f83015261294081612907565b9050919050565b5f81905092915050565b5f61295b826121a1565b6129658185612947565b93506129758185602086016121bb565b80840191505092915050565b5f61298c8285612951565b91506129988284612951565b91508190509392505050565b7f546f6b656e20646f6573206e6f742065786973740000000000000000000000005f82015250565b5f6129d86014836121ab565b91506129e3826129a4565b602082019050919050565b5f6020820190508181035f830152612a05816129cc565b9050919050565b7f546f6b656e206973206e6f7420657870697265642079657400000000000000005f82015250565b5f612a406018836121ab565b9150612a4b82612a0c565b602082019050919050565b5f6020820190508181035f830152612a6d81612a34565b9050919050565b7f546f6b656e2068617320657870697265640000000000000000000000000000005f82015250565b5f612aa86011836121ab565b9150612ab382612a74565b602082019050919050565b5f6020820190508181035f830152612ad581612a9c565b9050919050565b5f81519050919050565b5f82825260208201905092915050565b5f612b0082612adc565b612b0a8185612ae6565b9350612b1a8185602086016121bb565b612b23816121c9565b840191505092915050565b5f608082019050612b415f8301876122bf565b612b4e60208301866122bf565b612b5b604083018561234f565b8181036060830152612b6d8184612af6565b905095945050505050565b5f81519050612b8681612119565b92915050565b5f60208284031215612ba157612ba06120e6565b5b5f612bae84828501612b78565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f604082019050612bf75f8301856122bf565b612c04602083018461234f565b939250505056fea26469706673582212207fe1e340b31dfe504c393e9096bf8d568a0fb3d7bbf33f515cbf10014f9d3ea664736f6c634300081a0033";