import { IProvider, ProviderType } from "../interfaces/IProvider";
import { IAccount } from "../interfaces/IAccount";
import { JsonRpcClient } from "./JsonRpcClient";
import { IClientConfig } from "../interfaces/IClientConfig";

/** Global connection urls, for Massa's MAINNET, TESTNET and LABNET */
export enum DefaultJsonRpcProviderUrls {
	MAINNET = "https://massa.net/api/v2",
	TESTNET = "https://test.massa.net/api/v2",
	LABNET = "https://labnet.massa.net/api/v2",
	LOCALNET = "http://127.0.0.1",
}

export enum DefaultWsProviderUrls {
	MAINNET = "wss://massa.net/api/websocket",
	TESTNET = "wss://testnet.massa.net/api/websocket",
	LABNET = "wss://labnet.massa.net/api/websocket",
	LOCALNET = "ws://localhost",
}

/** Massa Web3 Client Factory for easy initialization */
export class ClientFactory {

	/** Factory Method for easy initializing a client using a default provider */
	public static async createDefaultJsonRpcClient(provider: DefaultJsonRpcProviderUrls, retryStrategyOn: boolean = true, baseAccount?: IAccount): Promise<JsonRpcClient> {
		let publicProviderUrl = provider.toString();
		let privateProviderUrl = provider.toString();
		switch (provider) {
			// in the case of localnet append specific default ports to url
			case DefaultJsonRpcProviderUrls.LOCALNET: {
				privateProviderUrl = `${privateProviderUrl}:33034`;
				publicProviderUrl = `${publicProviderUrl}:33035`;
				break;
			}
			// all other networks should be public only access
			default: {
				break;
			}
		}

		const providers = new Array({
			url: publicProviderUrl,
			type: ProviderType.PUBLIC
		} as IProvider,
		{
			url: privateProviderUrl,
			type: ProviderType.PRIVATE
		} as IProvider);

		const client: JsonRpcClient = new JsonRpcClient({
			retryStrategyOn,
			providers,
		} as IClientConfig, baseAccount);

		await client.wallet().setBaseAccount(baseAccount);

		return client;
	}

	/** Factory Method for easy initializing a client using a custom set of private and public providers. Suitable for local node interaction */
	public static async createCustomJsonRpcClient(providers: Array<IProvider>, retryStrategyOn: boolean = true, baseAccount?: IAccount): Promise<JsonRpcClient> {
		const client: JsonRpcClient = new JsonRpcClient({
			retryStrategyOn,
			providers
		} as IClientConfig, baseAccount);

		await client.wallet().setBaseAccount(baseAccount);

		return client;
	}
}
