import { toJS } from "mobx";
import { useMemo, useState } from "react";

const useStoreClone = (storeValue) =>{
  const storeValueClone = toJS(storeValue);
  const [storeValueCloneObservable, setLocalStoreValue] = useState(storeValueClone);

  useMemo(()=>{
    setLocalStoreValue(storeValue);
  },[storeValue]);

  return [storeValueCloneObservable, setLocalStoreValue];
};

export default useStoreClone;
