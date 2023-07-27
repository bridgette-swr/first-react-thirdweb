/// <reference types="node" />
import { EventEmitter } from "events";
import { KeyValueStorageOptions } from "@walletconnect/keyvaluestorage";
import {
  IEthereumProvider as IProvider,
  IEthereumProviderEvents,
  ProviderAccounts,
  RequestArguments,
} from "./walletConnectTypes";
import {
  Metadata,
  Namespace,
  UniversalProvider,
} from "@walletconnect/universal-provider";
import type {
  WalletConnectModalConfig,
  WalletConnectModal,
} from "@walletconnect/modal";
import { SessionTypes } from "@walletconnect/types";

export declare type QrModalOptions = Pick<
  WalletConnectModalConfig,
  | "themeMode"
  | "themeVariables"
  | "desktopWallets"
  | "enableExplorer"
  | "explorerRecommendedWalletIds"
  | "explorerExcludedWalletIds"
  | "mobileWallets"
  | "privacyPolicyUrl"
  | "termsOfServiceUrl"
  | "walletImages"
>;
export declare type RpcMethod =
  | "personal_sign"
  | "eth_sendTransaction"
  | "eth_accounts"
  | "eth_requestAccounts"
  | "eth_call"
  | "eth_getBalance"
  | "eth_sendRawTransaction"
  | "eth_sign"
  | "eth_signTransaction"
  | "eth_signTypedData"
  | "eth_signTypedData_v3"
  | "eth_signTypedData_v4"
  | "wallet_switchEthereumChain"
  | "wallet_addEthereumChain"
  | "wallet_getPermissions"
  | "wallet_requestPermissions"
  | "wallet_registerOnboarding"
  | "wallet_watchAsset"
  | "wallet_scanQRCode";
export declare type RpcEvent =
  | "accountsChanged"
  | "chainChanged"
  | "message"
  | "disconnect"
  | "connect";
export interface RpcMap {
  [chainId: string]: string;
}
export interface SessionEvent {
  event: {
    name: string;
    data: any;
  };
  chainId: string;
}
export interface RpcConfig {
  chains: string[];
  optionalChains: string[];
  methods: string[];
  optionalMethods?: string[];
  events: string[];
  optionalEvents?: string[];
  rpcMap: RpcMap;
  projectId: string;
  metadata?: Metadata;
  showQrModal: boolean;
  qrModalOptions?: QrModalOptions;
}
export interface ConnectOps {
  chains?: number[];
  optionalChains?: number[];
  rpcMap?: RpcMap;
  pairingTopic?: string;
}
export interface ITonConnectProvider extends IProvider {
  connect(opts?: ConnectOps | undefined): Promise<void>;
}
export declare function getRpcUrl(
  chainId: string,
  rpc: RpcConfig
): string | undefined;
export declare function getEthereumChainId(chains: string[]): number;
export declare function toHexChainId(chainId: number): string;
export declare type NamespacesParams = {
  chains: RpcConfig["chains"];
  optionalChains: RpcConfig["optionalChains"];
  methods?: RpcConfig["methods"];
  optionalMethods?: RpcConfig["methods"];
  events?: RpcConfig["events"];
  rpcMap: RpcConfig["rpcMap"];
  optionalEvents?: RpcConfig["events"];
};
export declare function buildNamespaces(params: NamespacesParams): {
  required?: Namespace;
  optional?: Namespace;
};
declare type ArrayOneOrMore<T> = {
  0: T;
} & Array<T>;
export declare type ChainsProps =
  | {
      chains: ArrayOneOrMore<number>;
      optionalChains?: number[];
    }
  | {
      chains?: number[];
      optionalChains: ArrayOneOrMore<number>;
    };
export declare type ProviderOptions = {
  projectId: string;
  methods?: string[];
  optionalMethods?: string[];
  events?: string[];
  optionalEvents?: string[];
  rpcMap?: RpcMap;
  metadata?: Metadata;
  showQrModal: boolean;
  qrModalOptions?: QrModalOptions;
  disableProviderPing?: boolean;
  relayUrl?: string;
  storageOptions?: KeyValueStorageOptions;
} & ChainsProps;
export declare class TonConnectProvider implements ITonConnectProvider {
  events: EventEmitter;
  namespace: string;
  accounts: string[];
  signer: InstanceType<typeof UniversalProvider>;
  chainId: number;
  modal?: WalletConnectModal;
  protected rpc: RpcConfig;
  protected readonly STORAGE_KEY: string;
  constructor();
  static init(opts: ProviderOptions): Promise<TonConnectProvider>;
  request<T = unknown>(args: RequestArguments): Promise<T>;
  sendAsync(
    args: RequestArguments,
    callback: (error: Error | null, response: any) => void
  ): void;
  get connected(): boolean;
  get connecting(): boolean;
  enable(): Promise<ProviderAccounts>;
  connect(opts?: ConnectOps): Promise<void>;
  disconnect(): Promise<void>;
  on: IEthereumProviderEvents["on"];
  once: IEthereumProviderEvents["once"];
  removeListener: IEthereumProviderEvents["removeListener"];
  off: IEthereumProviderEvents["off"];
  get isWalletConnect(): boolean;
  get session(): SessionTypes.Struct | undefined;
  protected registerEventListeners(): void;
  protected switchEthereumChain(chainId: number): void;
  protected isCompatibleChainId(chainId: string): boolean;
  protected formatChainId(chainId: number): string;
  protected parseChainId(chainId: string): number;
  protected setChainIds(chains: string[]): void;
  protected setChainId(chain: string): void;
  protected parseAccountId(account: string): {
    chainId: string;
    address: string;
  };
  protected setAccounts(accounts: string[]): void;
  protected getRpcConfig(opts: ProviderOptions): RpcConfig;
  protected buildRpcMap(chains: number[], projectId: string): RpcMap;
  protected initialize(opts: ProviderOptions): Promise<void>;
  protected loadConnectOpts(opts?: ConnectOps): void;
  protected getRpcUrl(chainId: number, projectId?: string): string;
  protected loadPersistedSession(): Promise<void>;
  protected reset(): void;
  protected persist(): void;
  protected parseAccounts(payload: string | string[]): string[];
  protected parseAccount: (payload: any) => string;
}
export default TonConnectProvider;
//# sourceMappingURL=EthereumProvider.d.ts.map
