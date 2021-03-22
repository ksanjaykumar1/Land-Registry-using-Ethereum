pragma solidity ^0.5.0;

contract DRealEstate {

    struct LandRecord {
        uint plotId;
        uint areaCode;
        uint length;
        uint breadth;
        string landAddress;
        bool forsale;
        uint price;
        address payable currentOwner;
        verificationStatus vs;
        bool isVerified;
        string docHash;
        
    }

    struct UserRecords {
        uint[] assetList;
    }
    
    //request status
    enum verificationStatus {pending,reject,approved}
    
    constructor () public {
        owner = msg.sender;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
     
    address public owner;
    uint public plotcount;
    mapping(uint=> LandRecord) public landrecords;
    mapping(address => UserRecords)  userRecords;
    
    
    //registering land records
    function registerLand(
        uint _areaCode,
        uint _length,
        uint _breadth,
        string memory _landAddress,
        uint _price, string memory _docHash) public returns(uint ) {

            plotcount++;
            
            landrecords[plotcount].plotId=plotcount;
            landrecords[plotcount].areaCode=_areaCode;
            landrecords[plotcount].length=_length;
            landrecords[plotcount].breadth=_breadth;
            landrecords[plotcount].landAddress=_landAddress;
            landrecords[plotcount].forsale=true;
            landrecords[plotcount].price=_price;
            landrecords[plotcount].currentOwner=msg.sender;
            landrecords[plotcount].docHash=_docHash;
            userRecords[msg.sender].assetList.push(plotcount);
            return plotcount;
        }
        
    function approveLandRecord(uint _plotId) public onlyOwner {
        landrecords[_plotId].vs = verificationStatus.approved;
        
    }
    function rejectLandRecord(uint _plotId) public onlyOwner {
        landrecords[_plotId].vs = verificationStatus.reject;
        
    }
    
    function buyLand(uint _plotId) public payable {

        LandRecord memory _record = landrecords[_plotId];
        
       require(_record.forsale,"land not for sale");
        require(_record.price<=msg.value,"insufficent balance");
        address(_record.currentOwner).transfer(msg.value);
        _record.currentOwner=msg.sender;
        _record.forsale=false;
        landrecords[_plotId]=_record;
        
    }
    function buyLandWithoutEther(uint _plotId, address payable newOwner) public payable {

        LandRecord memory _record = landrecords[_plotId];
        
       require(_record.forsale,"land not for sale");
        require(_record.price<=msg.value,"insufficent balance");
        address(_record.currentOwner).transfer(msg.value);
        _record.currentOwner=newOwner;
        _record.forsale=false;
        landrecords[_plotId]=_record;
        
    }

    function landForSale(uint _plotId) public {
        require(landrecords[_plotId].currentOwner==msg.sender,"Only land owner can call it");
        landrecords[_plotId].forsale=true;

    }

    function landNotForSale(uint _plotId) public {
        require(landrecords[_plotId].currentOwner==msg.sender,"Only land owner can call it");
        landrecords[_plotId].forsale=false;

    }
        
        
    
}