import { IEvent } from './IEvent';
import { IReadOperationResult } from './IReadOperationResult';
import { ISlot } from './ISlot';

export interface IExecuteReadOnlyData {
  /// The slot at which the read-only execution occurred.
  executed_at: ISlot;
  /// The result fo the read-only execution.
  result: IReadOperationResult;
  /// The output events generated by the read-only execution.
  output_events: Array<IEvent>;
  /// The gas cost for the execution
  gas_cost: number;
}
