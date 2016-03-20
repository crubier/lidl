{-# OPTIONS_GHC -Wall #-}

module AST.Ast where

import Data.Map
-- import Data.List
-- import Data.Maybe

data Definition
  = DefinitionData SignatureData Data [Definition]
  | DefinitionInterface SignatureInterface Interface [Definition]
  | DefinitionInteraction SignatureInteraction Interaction [Definition]

data SignatureData
  = SignatureData String

data Data
  = DataAlias String
  | DataAtomic String
  | DataComposite (Map String Data)
  | DataArray Data
  | DataFunction Data Data

data SignatureInterface
  = SignatureInterface String

data Direction
  = In
  | Out

data Interface
  = InterfaceAlias String
  | InterfaceAtomic String Direction
  | InterfaceComposite (Map String Interface)

data SignatureInteraction
  = SignatureInteraction [SignatureInteractionElement] Interface

data SignatureInteractionElement
  = OperatorElement String
  | OperandElement String Interface

data Interaction
  = Interaction [SignatureInteractionElement] (Maybe Interface)
