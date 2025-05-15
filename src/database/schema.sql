
-- Database Schema for Property Management System

-- Property Details - Primary table
CREATE TABLE Property_Details (
    id SERIAL PRIMARY KEY,
    propName TEXT NOT NULL,
    censusID INTEGER,
    propAddress TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    roomsKeys INTEGER NOT NULL,
    propType TEXT NOT NULL,
    status TEXT NOT NULL,
    keyMoney INTEGER,
    version TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Acquisition table
CREATE TABLE Acquisition (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id),
    acqCosts NUMERIC(10, 2),
    acqMonth TEXT,
    acqYear INTEGER,
    capRateGoingIn NUMERIC(10, 2),
    holdPeriod INTEGER,
    purchPrice INTEGER NOT NULL,
    purchPriceMethod TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Financing table
CREATE TABLE Financing (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id),
    amortYears INTEGER,
    discRate NUMERIC(10, 2),
    intRate NUMERIC(10, 2),
    intOnlyPeriod INTEGER,
    loanFeePct NUMERIC(10, 2),
    loanTerm INTEGER,
    ltvRatio NUMERIC(10, 2),
    capExReserve INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Disposition table
CREATE TABLE Disposition (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id),
    capRateExit NUMERIC(10, 2),
    salesExpPct NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- CapEx (Capital Expenditures) table
CREATE TABLE CapEx (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id),
    capExType TEXT,
    ownerFunded NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inflation Assumptions table
CREATE TABLE Inflation_Assumptions (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id),
    infRateGeneral NUMERIC(10, 2),
    infRateInsurance NUMERIC(10, 2),
    infRateTax NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Penetration Analysis table
CREATE TABLE Penetration (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id),
    compName TEXT,
    compRoomsKeys INTEGER,
    marketADRchange NUMERIC(10, 2),
    marketOccPct NUMERIC(10, 2),
    OccRoomGrowth NUMERIC(10, 2),
    propADRchange NUMERIC(10, 2),
    sampleHotelOcc NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Operating Revenue table
CREATE TABLE Operating_Revenue (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id),
    fbRev_pctRoomRev NUMERIC(10, 2),
    fbRevPOR INTEGER,
    othOpRevPOR INTEGER,
    rentalOthIncAmt INTEGER,
    rentalOthIncPOR INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Department Expense table
CREATE TABLE Dept_Expense (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id),
    fbExp_PctfbRev NUMERIC(10, 2),
    fbExpAmt INTEGER,
    fbExpPOR INTEGER,
    othOpExp_PctOthOpRev NUMERIC(10, 2),
    othOpExpAmt INTEGER,
    othOpExpPOR INTEGER,
    roomExp_pctRoomRev NUMERIC(10, 2),
    roomExpAmt INTEGER,
    roomExpPOR INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Fees (Management & Franchise Fees) table
CREATE TABLE Fees (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id),
    baseMgmtFee_PctTotRev NUMERIC(10, 2),
    franFee_pctFBrev NUMERIC(10, 2),
    franFee_pctRoomRev NUMERIC(10, 2),
    incentMgmtFee_pctTotRev NUMERIC(10, 2),
    incentMgmtFeeAmt INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Undistributed Expense table
CREATE TABLE Undist_Expense (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id),
    gaExp_pctRoomRev NUMERIC(10, 2),
    gaExpAmt INTEGER,
    gaExpPOR INTEGER,
    infoTele_pctTotRev NUMERIC(10, 2),
    infoTeleAmt INTEGER,
    infoTelePAR INTEGER,
    propOpMaintPAR INTEGER,
    propOpMaintPOR INTEGER,
    propOpMaint_pctTotRev NUMERIC(10, 2),
    saleMktgExp_pctTotRev NUMERIC(10, 2),
    saleMktgExpAmt INTEGER,
    saleMktgExpPAR INTEGER,
    utilPAR INTEGER,
    utilPOR INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Non-Operating Expenses table
CREATE TABLE NonOp_Expense (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id),
    groundRent_pctTotRev NUMERIC(10, 2),
    groundRentAmt INTEGER,
    insExp_pctTotRev NUMERIC(10, 2),
    insExpAmt INTEGER,
    leasesOthAmt INTEGER,
    leasesOthPAR INTEGER,
    propTaxAmt INTEGER,
    propTaxPAR INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- FF&E Reserve table
CREATE TABLE FFE_Reserve (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES Property_Details(id),
    resRep_pctTotRev NUMERIC(10, 2),
    contingency TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX idx_acquisition_property ON Acquisition(property_id);
CREATE INDEX idx_financing_property ON Financing(property_id);
CREATE INDEX idx_disposition_property ON Disposition(property_id);
CREATE INDEX idx_capex_property ON CapEx(property_id);
CREATE INDEX idx_inflation_property ON Inflation_Assumptions(property_id);
CREATE INDEX idx_penetration_property ON Penetration(property_id);
CREATE INDEX idx_oprevenue_property ON Operating_Revenue(property_id);
CREATE INDEX idx_deptexp_property ON Dept_Expense(property_id);
CREATE INDEX idx_fees_property ON Fees(property_id);
CREATE INDEX idx_undistexp_property ON Undist_Expense(property_id);
CREATE INDEX idx_nonopexp_property ON NonOp_Expense(property_id);
CREATE INDEX idx_ffereserve_property ON FFE_Reserve(property_id);
