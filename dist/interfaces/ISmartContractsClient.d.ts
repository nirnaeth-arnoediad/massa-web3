import { EOperationStatus } from "./EOperationStatus";
import { IAccount } from "./IAccount";
import { IBalance } from "./IBalance";
import { ICallData } from "./ICallData";
import { IContractData } from "./IContractData";
import { IContractReadOperationData } from "./IContractReadOperationData";
import { IContractStorageData } from "./IContractStorageData";
import { IEvent } from "./IEvent";
import { IEventFilter } from "./IEventFilter";
import { IExecuteReadOnlyResponse } from "./IExecuteReadOnlyResponse";
import { IReadData } from "./IReadData";
export interface ISmartContractsClient {
    deploySmartContract(contractData: IContractData, executor?: IAccount): Promise<Array<string>>;
    callSmartContract(callData: ICallData, executor?: IAccount): Promise<Array<string>>;
    readSmartContract(readData: IReadData): Promise<Array<IContractReadOperationData>>;
    getParallelBalance(address: string): Promise<IBalance | null>;
    getFilteredScOutputEvents(eventFilterData: IEventFilter): Promise<Array<IEvent>>;
    getDatastoreEntry(smartContractAddress: string, key: string): Promise<IContractStorageData | null>;
    executeReadOnlySmartContract(contractData: IContractData): Promise<Array<IExecuteReadOnlyResponse>>;
    getOperationStatus(opId: string): Promise<EOperationStatus>;
    awaitRequiredOperationStatus(opId: string, requiredStatus: EOperationStatus): Promise<EOperationStatus>;
}
